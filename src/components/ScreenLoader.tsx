import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function ScreenLoader() {
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const columnsRef = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isLoaderDone, setIsLoaderDone] = useState<boolean>(false);
  const [isDoneAll, setIsDoneAll] = useState<boolean>(false);
  const word = "dotrainier.";

  const columns = Array(10).fill(null);

  useEffect(() => {
    if(!isDoneAll){
      document.body.classList.add('no-scroll');
    }else{
      document.body.classList.remove('no-scroll');
    }

    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [isDoneAll])

  useEffect(() => {
    if(isLoaderDone){
      gsap.set(columnsRef.current, {
      scaleY: 1,
      transformOrigin: "bottom center"
    });

    gsap.to(columnsRef.current, {
      scaleY: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power3.inOut",
      delay: 0.5 
    });

    gsap.to(lettersRef.current, {
    opacity: 0,
    duration: .5,
    ease: "power2.out",
    delay: 0.8,
    onComplete: () => {
      setIsDoneAll(true)
    }
    });
    }
  
  }, [isLoaderDone]);


  
  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      lettersRef.current,
      { scaleY: 0, transformOrigin: "bottom" },
      {
        scaleY: 1,
        duration: 0.3,
        ease: "power3.out",
        stagger: 0.1,
        onComplete: () => {
           setIsLoaderDone(true)
        }
      }
    );

    return () => { tl.kill(); };
  }, []);


  return (
    <div 
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        display: 'flex',
        zIndex: 1000,
        pointerEvents: 'none' 
      }}
    >
      {columns.map((_, index) => (
        <div
          key={index}
          ref={el => { columnsRef.current[index] = el; }}
          className='bg-zinc-100 dark:bg-neutral-900'
          style={{
            flex: 1,
            height: '100%',
            transform: 'scaleY(1)'
          }}
        />
      ))}

      <div className='absolute left-1/2 top-1/2 -translate-1/2 text-slate-800 dark:text-zinc-50 text-7xl uppercase font-inter font-bold'> 
          {word.split("").map((letter, i) => (
          <span
            key={i}
            ref={(el) => {
              lettersRef.current[i] = el;
            }}
            className="inline-block origin-bottom"
          >
            {letter}
          </span>
        ))}
      </div>
    </div>
  );
};
