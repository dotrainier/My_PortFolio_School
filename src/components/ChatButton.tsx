"use client"
import { MessageSquareMore } from "lucide-react"
import { motion } from "framer-motion"
import ChatBox from "./Chatbox"
import { useState } from "react"
import { AnimatePresence } from "framer-motion"

const ChatButton:React.FC = () => {
    const [showChatbox, setShowChatbox] = useState<boolean>(false);

    const handleShow = () => {
        setShowChatbox(true);
    }

    const handleExit = () => {
        setShowChatbox(false);
    }

    return (
        <div className="fixed bottom-5 right-5 flex flex-col items-end z-50">
          
           <AnimatePresence >
           { showChatbox && 
                <ChatBox  handleExit={handleExit}/> 
           }
           </AnimatePresence>
           
            <button 
            onClick={handleShow}
            className="uppercase bg-black dark:bg-white font-medium dark:font-bold cursor-pointer text-white dark:text-black w-12 h-12  rounded-full shadow-md flex gap-2 items-center justify-center text-sm font-inter"
            >
                <motion.span animate={ !showChatbox ? { rotate: [-5, 5, -5] } : {rotate: [0]}}
             transition={ !showChatbox ? { repeat: Infinity, duration: 2, ease: "easeInOut", repeatDelay: 0.5 }  : {}} >
                    <MessageSquareMore className="" size={20} strokeWidth={1.5} />
                </motion.span>
            </button>
        </div>
    )
}

export default ChatButton