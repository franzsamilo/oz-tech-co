import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export interface StaggeredMenuItem {
  label: string;
  ariaLabel: string;
  link: string;
}
export interface StaggeredMenuSocialItem {
  label: string;
  link: string;
}
export interface StaggeredMenuProps {
  position?: "left" | "right";
  colors?: string[];
  items?: StaggeredMenuItem[];
  socialItems?: StaggeredMenuSocialItem[];
  displaySocials?: boolean;
  displayItemNumbering?: boolean;
  className?: string;
  logoUrl?: string;
  menuButtonColor?: string;
  openMenuButtonColor?: string;
  accentColor?: string;
  isFixed: boolean;
  changeMenuColorOnOpen?: boolean;
  closeOnClickAway?: boolean;
  onMenuOpen?: () => void;
  onMenuClose?: () => void;
}

export const StaggeredMenu: React.FC<StaggeredMenuProps> = ({
  position = "right",
  colors = ["#0f172a", "#1e3a5f", "#c48a3f"],
  items = [],
  socialItems = [],
  displaySocials = true,
  displayItemNumbering = true,
  className,
  menuButtonColor = "#0f172a",
  accentColor = "#c48a3f",
  isFixed = false,
  closeOnClickAway = true,
  onMenuOpen,
  onMenuClose,
}: StaggeredMenuProps) => {
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);

  const panelRef = useRef<HTMLDivElement | null>(null);
  const preLayersRef = useRef<HTMLDivElement | null>(null);
  const preLayerElsRef = useRef<HTMLElement[]>([]);

  const plusHRef = useRef<HTMLSpanElement | null>(null);
  const plusVRef = useRef<HTMLSpanElement | null>(null);
  const iconRef = useRef<HTMLSpanElement | null>(null);

  const textInnerRef = useRef<HTMLSpanElement | null>(null);
  const [textLines, setTextLines] = useState<string[]>(["Menu", "Close"]);

  const openTlRef = useRef<gsap.core.Timeline | null>(null);
  const closeTweenRef = useRef<gsap.core.Tween | null>(null);
  const spinTweenRef = useRef<gsap.core.Timeline | null>(null);
  const textCycleAnimRef = useRef<gsap.core.Tween | null>(null);
  const colorTweenRef = useRef<gsap.core.Tween | null>(null);

  const toggleBtnRef = useRef<HTMLButtonElement | null>(null);
  const busyRef = useRef(false);

  const itemEntranceTweenRef = useRef<gsap.core.Tween | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panel = panelRef.current;
      const preContainer = preLayersRef.current;

      const h = plusHRef.current;
      const v = plusVRef.current;
      const icon = iconRef.current;
      const textInner = textInnerRef.current;

      if (!panel || !h || !v || !icon || !textInner) return;

      let layers: HTMLElement[] = [];
      if (preContainer) {
        layers = Array.from(preContainer.querySelectorAll(".sm-prelayer")) as HTMLElement[];
      }
      preLayerElsRef.current = layers;

      const offscreen = position === "left" ? -100 : 100;
      gsap.set([panel, ...layers], { xPercent: offscreen });

      gsap.set(h, { transformOrigin: "50% 50%", rotate: 0 });
      gsap.set(v, { transformOrigin: "50% 50%", rotate: 90 });
      gsap.set(icon, { rotate: 0, transformOrigin: "50% 50%" });

      gsap.set(textInner, { yPercent: 0 });

      if (toggleBtnRef.current)
        gsap.set(toggleBtnRef.current, { color: menuButtonColor });
    });
    return () => ctx.revert();
  }, [position, menuButtonColor]);

  const buildOpenTimeline = useCallback(() => {
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return null;

    openTlRef.current?.kill();
    if (closeTweenRef.current) {
      closeTweenRef.current.kill();
      closeTweenRef.current = null;
    }
    itemEntranceTweenRef.current?.kill();

    const itemEls = Array.from(panel.querySelectorAll(".sm-panel-itemLabel")) as HTMLElement[];
    const numberEls = Array.from(panel.querySelectorAll(".sm-panel-list[data-numbering] .sm-panel-item")) as HTMLElement[];

    const layerStates = layers.map((el) => ({
      el,
      start: Number(gsap.getProperty(el, "xPercent")),
    }));
    const panelStart = Number(gsap.getProperty(panel, "xPercent"));

    if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });
    if (numberEls.length) gsap.set(numberEls, { ["--sm-num-opacity" as any]: 0 });

    const tl = gsap.timeline({ paused: true });

    layerStates.forEach((ls, i) => {
      tl.fromTo(
        ls.el,
        { xPercent: ls.start },
        { xPercent: 0, duration: 0.5, ease: "power4.out" },
        i * 0.07,
      );
    });

    const lastTime = layerStates.length ? (layerStates.length - 1) * 0.07 : 0;
    const panelInsertTime = lastTime + (layerStates.length ? 0.08 : 0);
    const panelDuration = 0.65;

    tl.fromTo(
      panel,
      { xPercent: panelStart },
      { xPercent: 0, duration: panelDuration, ease: "power4.out" },
      panelInsertTime,
    );

    if (itemEls.length) {
      const itemsStart = panelInsertTime + panelDuration * 0.15;
      tl.to(
        itemEls,
        {
          yPercent: 0,
          rotate: 0,
          duration: 1,
          ease: "power4.out",
          stagger: { each: 0.1, from: "start" },
        },
        itemsStart,
      );

      if (numberEls.length) {
        tl.to(
          numberEls,
          {
            duration: 0.6,
            ease: "power2.out",
            ["--sm-num-opacity" as any]: 1,
            stagger: { each: 0.08, from: "start" },
          },
          itemsStart + 0.1,
        );
      }
    }

    openTlRef.current = tl;
    return tl;
  }, [position]);

  const playOpen = useCallback(() => {
    if (busyRef.current) return;
    busyRef.current = true;
    const tl = buildOpenTimeline();
    if (tl) {
      tl.eventCallback("onComplete", () => {
        busyRef.current = false;
      });
      tl.play(0);
    } else {
      busyRef.current = false;
    }
  }, [buildOpenTimeline]);

  const playClose = useCallback(() => {
    openTlRef.current?.kill();
    openTlRef.current = null;
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return;

    const all = [...layers, panel];
    closeTweenRef.current?.kill();

    const offscreen = position === "left" ? -100 : 100;

    closeTweenRef.current = gsap.to(all, {
      xPercent: offscreen,
      duration: 0.32,
      ease: "power3.in",
      overwrite: "auto",
      onComplete: () => {
        const itemEls = Array.from(panel.querySelectorAll(".sm-panel-itemLabel")) as HTMLElement[];
        if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });
        busyRef.current = false;
      },
    });
  }, [position]);

  const animateIcon = useCallback((opening: boolean) => {
    const icon = iconRef.current;
    const h = plusHRef.current;
    const v = plusVRef.current;
    if (!icon || !h || !v) return;

    spinTweenRef.current?.kill();

    if (opening) {
      spinTweenRef.current = gsap.timeline({ defaults: { ease: "power4.out" } })
        .to(h, { rotate: 45, duration: 0.5 }, 0)
        .to(v, { rotate: -45, duration: 0.5 }, 0);
    } else {
      spinTweenRef.current = gsap.timeline({ defaults: { ease: "power3.inOut" } })
        .to(h, { rotate: 0, duration: 0.35 }, 0)
        .to(v, { rotate: 90, duration: 0.35 }, 0);
    }
  }, []);

  const animateColor = useCallback((opening: boolean) => {
    const btn = toggleBtnRef.current;
    if (!btn) return;
    colorTweenRef.current?.kill();
    colorTweenRef.current = gsap.to(btn, {
      color: opening ? "#ffffff" : menuButtonColor,
      duration: 0.3,
      ease: "power2.out",
    });
  }, [menuButtonColor]);

  const animateText = useCallback((opening: boolean) => {
    const inner = textInnerRef.current;
    if (!inner) return;

    textCycleAnimRef.current?.kill();

    const seq = opening ? ["Menu", "Close"] : ["Close", "Menu"];
    setTextLines(seq);
    gsap.set(inner, { yPercent: 0 });

    textCycleAnimRef.current = gsap.to(inner, {
      yPercent: -50,
      duration: 0.4,
      ease: "power4.out",
    });
  }, []);

  const toggleMenu = useCallback(() => {
    const target = !openRef.current;
    openRef.current = target;
    setOpen(target);

    if (target) {
      onMenuOpen?.();
      playOpen();
    } else {
      onMenuClose?.();
      playClose();
    }

    animateIcon(target);
    animateColor(target);
    animateText(target);
  }, [playOpen, playClose, animateIcon, animateColor, animateText, onMenuOpen, onMenuClose]);

  return (
    <div className={`sm-scope ${isFixed ? "fixed top-0 left-0 w-screen h-screen pointer-events-none z-100" : "relative z-50"}`}>
      <div className={`${className || ""} staggered-menu-wrapper pointer-events-none relative w-full h-full`} data-position={position} data-open={open || undefined}>
        <div ref={preLayersRef} className="sm-prelayers absolute top-0 right-0 bottom-0 pointer-events-none z-10">
          {colors.slice(0, 3).map((c, i) => (
            <div key={i} className="sm-prelayer absolute top-0 right-0 h-full w-full" style={{ background: c }} />
          ))}
        </div>

        <header className="absolute top-0 left-0 w-full flex items-center justify-end p-6 z-100">
          <button
            ref={toggleBtnRef}
            className={`sm-toggle pointer-events-auto flex items-center gap-3 bg-transparent border-0 font-bold uppercase tracking-wider text-sm transition-transform hover:scale-110 py-3`}
            onClick={toggleMenu}
            type="button"
          >
            <span className="relative h-[2.5em] overflow-hidden flex items-center">
               <span ref={textInnerRef} className="flex flex-col">
                 {textLines.map((l, i) => (
                   <span key={i} className="h-[2.5em] flex items-center justify-center pt-[2.4em]">
                     {l}
                   </span>
                 ))}
               </span>
            </span>
            <span ref={iconRef} className="relative w-7 h-7 flex items-center justify-center">
               <span ref={plusHRef} className="absolute w-full h-[3px] bg-current rounded-full" />
               <span ref={plusVRef} className="absolute w-full h-[3px] bg-current rounded-full" />
            </span>
          </button>
        </header>

        <aside ref={panelRef} className="staggered-menu-panel absolute top-0 right-0 h-full bg-[#0a0a0a] flex flex-col p-20 overflow-y-auto z-50 backdrop-blur-xl border-l border-white/5 pointer-events-auto">
           <ul className="list-none p-0 flex flex-col gap-6" data-numbering={displayItemNumbering || undefined}>
             {items.map((it, idx) => (
               <li key={idx} className="overflow-hidden">
                 <a 
                   href={it.link} 
                   className="sm-panel-item block text-white text-5xl font-heading font-black uppercase tracking-tighter hover:text-[#c48a3f] transition-colors"
                   onClick={() => {
                     if (it.link.startsWith("#")) setTimeout(toggleMenu, 300);
                   }}
                 >
                   <span className="sm-panel-itemLabel inline-block">{it.label}</span>
                 </a>
               </li>
             ))}
           </ul>
        </aside>
      </div>

      <style>{`
        .sm-scope .staggered-menu-panel { width: clamp(300px, 40vw, 500px); }
        .sm-scope .sm-prelayers { width: clamp(300px, 40vw, 500px); }
        .sm-scope .sm-panel-list[data-numbering] .sm-panel-item { position: relative; }
        .sm-scope .sm-panel-list[data-numbering] .sm-panel-item::after {
          content: attr(data-index);
          position: absolute;
          top: 0;
          right: -1.5em;
          font-size: 0.2em;
          color: #c48a3f;
        }
        @media (max-width: 768px) {
          .sm-scope .staggered-menu-panel, .sm-scope .sm-prelayers { width: 100%; right: 0; left: 0; }
        }
      `}</style>
    </div>
  );
};

export default StaggeredMenu;
