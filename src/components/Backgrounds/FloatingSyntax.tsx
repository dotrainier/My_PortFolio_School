"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const positions = [100, 400, 700, 1000, 1300];

const FloatingSyntax: React.FC = () => {
    
    const [syntaxes, setSyntaxes] = useState<{id: number; positionX: number, syntax: string }[]>([]);
    const [allSyntaxIndex, setAllSyntaxIndex] = useState<number>(0);
   


    useEffect(() => {
        const syntax = ['</>', 'λ', '%', '<<', '~', ';'];
        const minSyntaxIndex = 0;
        const maxSyntaxIndex = syntax.length -1;

    
        const interval = setInterval(() => {    
            const randomSyntax = Math.floor(Math.random() * (maxSyntaxIndex - minSyntaxIndex + 1)) + minSyntaxIndex;
            const currentAvailablePosition  = allSyntaxIndex % positions.length;

            setSyntaxes((prevSyntaxes) => [
                ...prevSyntaxes,
                {id: Date.now(), positionX: positions[currentAvailablePosition], syntax: syntax[randomSyntax]}
            ])
            
        
            setAllSyntaxIndex((prev) => prev + 1);       
    }, 1100)

        return () => clearInterval(interval);   

    }, [allSyntaxIndex])


    const removeSyntaxById = (id: number) => {
        setSyntaxes((prevSyntaxes) => prevSyntaxes.filter((syntax) => syntax.id !== id));
    };
    

    const handleAnimationEnd = ( id: number) => {
        removeSyntaxById(id);
    }

    
    return (
        <div className="absolute inset-0 z-20">
            {
                syntaxes.map(({id, positionX, syntax}) => (
                 <motion.div
                 key={id}
                 initial={{ y: 0, scale: 1, opacity: 1 }}
                 animate={{
                   y: 250,          
                   rotate: [0, 360],  
                   scale: 0 ,
                   opacity: 0.8
                 }}
                 transition={{
                   y: { duration: 10, ease: "linear" },       
                   scale: { duration: 5, ease: "linear", delay: 5 },
                   opacity: { duration: 5, ease: "linear", delay: 5 },
                   rotate: { duration: 8, ease: "linear" }  ,
                 }}
                 
                 className="top-0 font-fira text-xl text-gray-500  absolute dark:text-[#4A90E2]"
                 style={{ left: positionX }}
                 onAnimationComplete={() => handleAnimationEnd(id)}
                 >
                    { syntax }
                 </motion.div>
                ))
            }
        </div>
    );
};

export default FloatingSyntax;
