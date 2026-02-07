import React, { useEffect, useRef, useMemo, ReactNode, RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: ReactNode;
  scrollContainerRef?: RefObject<HTMLElement>;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
  rotationEnd?: string;
  wordAnimationEnd?: string;
  textSize?: string;
  lineHeight?: string;
  fontWeight?: string;
  margin?: string;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = '',
  textClassName = '',
  rotationEnd = 'bottom bottom',
  wordAnimationEnd = 'bottom bottom',
  textSize = 'text-[clamp(2rem,4.8vw,3.75rem)]',
  lineHeight = 'leading-[1.2]',
  fontWeight = 'font-semibold',
  margin = 'my-5'
}) => {
  const containerRef = useRef<HTMLHeadingElement>(null);

  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    return text.split(/(\s+)/).map((word, index) => {
      if (word.match(/^\s+$/)) return word;
      return (
        <span className="inline-block word whitespace-nowrap break-keep" key={index}>
          {word}
        </span>
      );
    });
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller = scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window;

    gsap.fromTo(
      el,
      { transformOrigin: '0% 50%', rotate: baseRotation },
      {
        ease: 'none',
        rotate: 0,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: 'top bottom',
          end: rotationEnd,
          scrub: true
        }
      }
    );

    const wordElements = el.querySelectorAll<HTMLElement>('.word');

    gsap.fromTo(
      wordElements,
      { 
        opacity: 0, 
        y: 20, 
        filter: enableBlur ? `blur(${blurStrength}px)` : 'none' 
      },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.05,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: 'top 85%',
          once: true
        }
      }
    );

    return () => {
      // Only kill ScrollTriggers associated with this element
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === el || trigger.vars?.trigger === el) {
          trigger.kill();
        }
      });
    };
  }, [scrollContainerRef, enableBlur, baseRotation, baseOpacity, rotationEnd, wordAnimationEnd, blurStrength]);

  return (
    <h2 ref={containerRef} className={`${margin} ${containerClassName}`}>
      <p className={`${textSize} ${lineHeight} ${fontWeight} ${textClassName}`}>{splitText}</p>
    </h2>
  );
};

export default ScrollReveal;
