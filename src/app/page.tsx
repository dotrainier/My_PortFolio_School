"use client"
import ThemeSwitcher from "@/components/ThemeSwitcher";
import Cursor from "@/components/Cursor";
import ChatButton from "@/components/ChatButton";
import Image from "next/image";
import logo from '../../public/logo.svg'
import logoDark from '../../public/logoDark.svg'
import FloatingSyntax from "@/components/Backgrounds/FloatingSyntax";
import ScreenLoader from "@/components/ScreenLoader";
import { useTheme } from "next-themes";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


export default function Home() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const introTextTef = useRef<HTMLDivElement | null>(null);
  const {theme} = useTheme();

  useEffect(() => {
  const container = containerRef.current;

gsap.to(introTextTef.current, {
  yPercent: -100,
  ease: "none",
  scrollTrigger: {
    trigger: container,
    start: "55% 50%", 
    end: "60% 30%",   
    scrub: true,
  }
});
  
  return () => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  };
}, [])
  
  return (
   <>
  
   <main className="min-h-screen relative">
      <Cursor/>
      <section ref={containerRef} className="h-screen flex flex-col relative overflow-hidden">
         <ScreenLoader />
        <div className="px-4 py-4 flex justify-between">
          <div className="flex items-center gap-1.5">
              <Image src={theme === 'dark' ? logoDark : logo} alt="logo" width={20} height={20}/>
              <div className="font-sans font-bold">dotrainier</div>
          </div>
          <ThemeSwitcher></ThemeSwitcher>
        </div>
        <div className="flex-1 flex  mt-40 mx-auto flex-col font-nunito_sans font-bold text-left dark:text-white text-[#111110] ">
          <div ref={introTextTef} className="relative " >
            <div   className="text-7xl">I&apos;m Rainier,</div>
            <div className=" text-7xl">Software Dev</div>
            <div className="font-normal text-lg absolute top-full w-max"> 
                <span className="inline-flex items-center gap-1">
                  <span className="text-gray-400 dark:text-gray-500">
                  {'<'}
                  </span>
                  <span className="text-red-400">Bugs</span>
                  <span className="text-gray-800 dark:text-gray-200">hate me. Users love me. Problems? Just features waiting for my commit</span>
                  <span className="text-gray-400 dark:text-gray-500">
                    {'/>'}
                  </span>
                </span>  
            </div>
          </div>
        </div>

        <div className="z-10 font-nunito 
        [text-shadow:_1px_1px_0_rgba(17,17,16,0.15),_-1px_1px_0_rgba(17,17,16,0.15),_1px_-1px_0_rgba(17,17,16,0.15),_-1px_-1px_0_rgba(17,17,16,0.15)]
        dark:[text-shadow:_1px_1px_0_rgba(255,255,255,0.15),_-1px_1px_0_rgba(255,255,255,0.15),_1px_-1px_0_rgba(255,255,255,0.15),_-1px_-1px_0_rgba(255,255,255,0.15)]
         text-white dark:text-black font-bold text-[380px] absolute bottom-0 leading-[300px] -left-[100px]">dotrainier</div>
        <ChatButton/>
        <FloatingSyntax/>
      </section> 

    <div className="h-screen"></div>
   </main>
   </>
  );
}
