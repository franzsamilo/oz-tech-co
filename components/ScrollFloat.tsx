import React, { useEffect, useMemo, useRef, ReactNode, RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollFloatProps {
  children: ReactNode;
  scrollContainerRef?: RefObject<HTMLElement>;
  containerClassName?: string;
  textClassName?: string;
  animationDuration?: number;
  ease?: string;
  scrollStart?: string;
  scrollEnd?: string;
  stagger?: number;
  textSize?: string;
  lineHeight?: string;
  margin?: string;
}

const ScrollFloat: React.FC<ScrollFloatProps> = ({
  children,
  scrollContainerRef,
  containerClassName = '',
  textClassName = '',
  animationDuration = 1,
  ease = 'back.inOut(2)',
  scrollStart = 'center bottom+=50%',
  scrollEnd = 'bottom bottom-=40%',
  stagger = 0.03,
  textSize = 'text-[clamp(2rem,4.8vw,3.75rem)]',
  lineHeight = 'leading-[1.2]',
  margin = 'my-5'
}) => {
  const containerRef = useRef<HTMLHeadingElement>(null);

  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    const words = text.split(/(\s+)/);
    return words.map((word, wordIndex) => {
      if (word.match(/^\s+$/)) return word === ' ' ? '\u00A0' : word;
      
      return (
        <span key={wordIndex} className="inline-block whitespace-nowrap">
          {word.split('').map((char, charIndex) => (
            <span className="inline-block char" key={charIndex}>
              {char}
            </span>
          ))}
        </span>
      );
    });
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller = scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window;

    const charElements = el.querySelectorAll('.char');

    const animation = gsap.fromTo(
      charElements,
      {
        willChange: 'opacity, transform',
        opacity: 0,
        yPercent: 120,
        scaleY: 2.3,
        scaleX: 0.7,
        transformOrigin: '50% 0%'
      },
      {
        duration: animationDuration,
        ease: 'power3.out',
        opacity: 1,
        yPercent: 0,
        scaleY: 1,
        scaleX: 1,
        stagger: stagger,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: 'top 85%',
          once: true
        }
      }
    );

    return () => {
      animation.kill();
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === el) {
          trigger.kill();
        }
      });
    };
  }, [scrollContainerRef, animationDuration, ease, scrollStart, scrollEnd, stagger]);

  return (
    <h2 ref={containerRef} className={`${margin} overflow-hidden ${containerClassName}`}>
      <span className={`inline-block ${textSize} ${lineHeight} ${textClassName}`}>{splitText}</span>
    </h2>
  );
};

export default ScrollFloat;
