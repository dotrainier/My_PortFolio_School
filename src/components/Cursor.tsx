"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Cursor: React.FC = () => {
    const [position, setPosition] = useState({x: 0, y: 0});

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY});
        }

        window.addEventListener("mousemove", moveCursor);

        return () => window.removeEventListener("mousemove", moveCursor);
    }, [])

    return(
        <>
            <motion.div className="fixed top-0 left-0 w-8 h-8 border z-30 border-black dark:border-white rounded-full pointer-events-none flex items-center justify-center"
           
            animate = {{x: position.x, y: position.y}}
            transition={{ type: "spring", stiffness: 600, damping: 30 }}
            >
                <motion.div className="w-2 h-2 bg-[#4A90E2] rounded-full">

                </motion.div>
            </motion.div>
        </>
    )
}
export default Cursor