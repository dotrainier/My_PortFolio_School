import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectBox from "./ProjectImage";

import Bangketa from "@/assets/images/projects/bangketa.png";
import Hacienda from "@/assets/images/projects/hacienda.png"
import Twitter from "@/assets/images/projects/twitter.png"
import TicTacToe from "@/assets/images/projects/tic-tac-toe.png"
import ResumeBuilder from "@/assets/images/projects/resume.png"
import TodoList from "@/assets/images/projects/todolist.png"
import RockPaperScissor from "@/assets/images/projects/tic-tac-toe.png"
import Automatron from "@/assets/images/projects/automatron.png"

gsap.registerPlugin(ScrollTrigger);

export default function ProjectContainer() {
    const projectsRef = useRef<(HTMLElement | null)[]>([]);

    const addToRefs = (el: HTMLElement | null) => {
    if (el && !projectsRef.current.includes(el)) {
        projectsRef.current.push(el);
    }
    };

    useEffect(() => {
        projectsRef.current.forEach((project, index) => {
        const speed = index % 2 === 0 ? 120 : 160;
        
        gsap.fromTo(project, 
            { y: speed },
            {
            y: -speed,
            ease: "none",
            scrollTrigger: {
                trigger: project,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
            }
            }
        );
        });

  
        return () => {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="pb-20">
      <div className="text-3xl font-bold text-neutral-800 mb-8 dark:text-zinc-50">
        My Projects
      </div>
      
      <div className="grid grid-cols-12 gap-12 project-container">
        <div className="col-span-6 space-y-10">
            <ProjectBox src={Bangketa} addToRefs={addToRefs} altText="bangketa" title="Bangketa - A Nonprofit Volunteer Website" link="https://bangketaeskwela.netlify.app/"/>
            <ProjectBox src={Twitter} addToRefs={addToRefs} altText="twitter" title="Twitter Clone" link="https://twitter-clone-delta-neon.vercel.app/"/>
            <ProjectBox src={ResumeBuilder} addToRefs={addToRefs} altText="resume" title="Resume Builder"/>
            <ProjectBox src={RockPaperScissor} addToRefs={addToRefs} altText="rockpaperscissor" title="Rock Paper Scissor" link="https://dotrainier.github.io/Rock-Paper-Scissor/"/>
        </div>

        <div className="col-span-6 mt-8 space-y-10">
            <ProjectBox src={Hacienda} addToRefs={addToRefs} altText="hacienda" title="Restaurant Website" link="https://dotrainier.github.io/Restaurant/"/>
            <ProjectBox src={TicTacToe} addToRefs={addToRefs} altText="tic-tac-toe" title="Tic Tac Toe" link="https://dotrainier.github.io/Tic-Tac-Toe/"/>
            <ProjectBox src={TodoList} addToRefs={addToRefs} altText="todolist" title="To Do List" link="https://dotrainier.github.io/ToDoList/"/>
            <ProjectBox src={Automatron} addToRefs={addToRefs} altText="automatic" title="Automatron" link="https://www.youtube.com/watch?v=1L0w_uJkgtg"/>
        </div>
      </div>
    </div>
  );
}