import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useTheme } from "next-themes";

import Javascript from "@/assets/images/stacks/frontend/js.svg"
import Typescript from "@/assets/images/stacks/frontend/ts.svg"
import React from "@/assets/images/stacks/frontend/react.svg"
import NextJs from "@/assets/images/stacks/frontend/nextjs.svg"
import Tailwind from "@/assets/images/stacks/frontend/tailwind.svg"
import Framer from "@/assets/images/stacks/frontend/framer.svg"
import Zustand from "@/assets/images/stacks/frontend/zustand.svg"

import NodeJS from "@/assets/images/stacks/backend/nodejs.svg"
import NodeJsDark from "@/assets/images/stacks/backend/nodejs-dark.svg"
import PostgreSql from "@/assets/images/stacks/backend/postgre.svg"
import MySQL from "@/assets/images/stacks/backend/mySQL.svg"
import PHP from "@/assets/images/stacks/backend/php.svg"
import Python from "@/assets/images/stacks/backend/python.svg"

import ExpressJS from "@/assets/images/stacks/backend/expressjs.svg"
import ExpressJsDark from "@/assets/images/stacks/backend/expressjs-dark.svg"
import PHPDark from "@/assets/images/stacks/backend/php-dark.svg"

import Postman from "@/assets/images/stacks/tools/postman.svg"
import Netlify from "@/assets/images/stacks/tools/netlify.svg"
import Github from "@/assets/images/stacks/tools/github.svg"
import GithubDark from "@/assets/images/stacks/tools/github-dark.svg"

const frontendStacks = [
    {
        icon: Javascript,
        name: "Javascript"
    },

    {
        icon: Typescript,
        name: "Typescript"
    },

    {
        icon: React,
        name: "React"
    },

    {
        icon: NextJs,
        name: "NextJs"
    },

    {
        icon: Tailwind,
        name: "Tailwind"
    },

    {
        icon: Framer,
        name: "Framer"
    },

      {
        icon: Zustand,
        name: "Zustand"
    }
]

const backendendStacks = [
    {
        icon: NodeJS,
        iconDark: NodeJsDark,
        name: "NodeJS",
    },

    {
        icon: ExpressJS,
        iconDark: ExpressJsDark,
        name: "ExpressJS",
    },

    {
        icon: PostgreSql,
        name: "PostgreSql",
    },

    {
        icon: MySQL,
        name: "MySQL",
    },
    {
        icon: PHP,
        iconDark: PHPDark,
        name: "PHP",
    },
    {
        icon: Python,
        name: "Python",
    },
]


const toolStacks = [
    {
        icon: Postman,
        name: "Postman"
    },

    {
        icon: Netlify,
        name: "Netlify"
    },

    {
        icon: Github,
        iconDark: GithubDark,
        name: "Github"
    },

]

gsap.registerPlugin(ScrollTrigger);
export default function StackContainer() {
    const { theme } = useTheme();
    useEffect(() => {
    gsap.utils.toArray<HTMLElement>('.stack-container').forEach(container => {
        const stackElements = container.querySelectorAll('.stack, .stackName');

        gsap.fromTo(stackElements,
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                stagger: 0.2,
                duration: 0.5,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: container,
                    start: 'top 65%',
                    end: 'bottom 75%',
                    toggleActions: "play none reverse none",
                }
            }
        );
    });

    return () => {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
}, []);


    return (
      <div>
          <div className="text-lg font-bold text-neutral-800 mb-8 dark:text-zinc-50">MY STACK</div>
          <div  className="space-y-20">
            <div className="font-nunito_sans grid grid-cols-12 stack-container">
                <div className="text-4xl text-neutral-700 dark:text-zinc-50 font-extrabold col-span-5 stackName">FRONTEND</div>
                <div className="text-2xl font-medium flex gap-8 col-span-7 flex-wrap">
                    {
                        frontendStacks.map((stack) => (
                            <div key={stack.name} className="stack flex items-center gap-3 text-xl text-neutral-700 dark:text-zinc-50  font-bold font-nunito">
                                <div className="h-10 w-10 ">
                                    <Image src={theme === "dark" && 'iconDark' in stack ? stack.iconDark || stack.icon : stack.icon} alt={stack.name} className="w-full h-full" width={60} height={60}/>
                                </div>
                                {stack.name}
                            </div>
                        ))
                    }
                </div>
            </div>

             <div className="font-nunito_sans grid grid-cols-12 stack-container">
                <div className="text-4xl text-neutral-700 dark:text-zinc-50 font-extrabold col-span-5 stackName">BACKEND</div>
                <div className="text-2xl font-medium flex gap-8 col-span-7 flex-wrap">
                    {
                        backendendStacks.map((stack) => (
                            <div key={stack.name} className="stack flex items-center gap-3 text-xl text-neutral-700 dark:text-zinc-50 font-bold font-nunito">
                                <div className="h-10 w-10 ">
                                    <Image src={theme === "dark" && 'iconDark' in stack ? stack.iconDark || stack.icon : stack.icon} alt={stack.name} className="w-full h-full" width={60} height={60}/>
                                </div>
                                {stack.name}
                            </div>
                        ))
                    }
                </div>
            </div>

              <div className="font-nunito_sans grid grid-cols-12 stack-container">
                <div className="text-4xl text-neutral-700 dark:text-zinc-50 font-extrabold col-span-5 stackName">Tools</div>
                <div className="text-2xl font-medium flex gap-8 col-span-7 flex-wrap">
                    {
                        toolStacks.map((stack) => (
                            <div key={stack.name} className="stack flex items-center gap-3 text-xl text-neutral-700 dark:text-zinc-50  font-bold font-nunito">
                                <div className="h-10 w-10 ">
                                    <Image  src={theme === "dark" && 'iconDark' in stack ? stack.iconDark || stack.icon : stack.icon}
                                    alt={stack.name} className="w-full h-full" width={60} height={60}/>
                                </div>
                                {stack.name}
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
      </div>
    );
}