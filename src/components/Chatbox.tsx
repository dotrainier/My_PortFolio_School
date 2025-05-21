"use client"
import Image from 'next/image'
import my_pic_square from '@/assets/images/my_pic -Square.jpg'
import no_pic from '@/assets/images/no_picture.png'
import { X, SendHorizontal } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'


interface ChatBoxProps{
    handleExit: () => void;
}

interface ChatMessageProps {
    id: number;
    sender: string;
    message: string;
}

const initialChatMessages: ChatMessageProps[] = [
    {
      "id": 1,
      "sender": "bot",
      "message": "Hi! Thanks for visiting my website. Feel free to ask anything about my work and anything related to programming."
    },
  ]
  

const ChatBox:React.FC<ChatBoxProps> = ({ handleExit }) => {
    const [chatInput, setChatInput] = useState<string>('');
    const [onSendingPrompt, setOnSendingPromp] = useState<boolean>(false);
    const [chatMessages, setChatMessages] = useState<ChatMessageProps[]>(initialChatMessages);
    const toScrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        toScrollRef.current?.scrollIntoView({
            behavior: 'smooth'
        })
    }, [chatMessages])
   

    const delay = (ms: number): Promise<void> => {
        return new Promise((resolve) => setTimeout(resolve, ms));
      };


    const onSubmitMessage = async () => {
       if(!chatInput.trim()) return;

       try {

        const newChatMessage =  {
            id: chatMessages.length + 1,
            sender: "user",
            message: chatInput
        }
        
        const prompt = chatInput;
        setChatMessages([...chatMessages, newChatMessage]);
        setChatInput(''); 
        setOnSendingPromp(true);
        await delay(300);
        const botMessageId = chatMessages.length + 2;
       
        setChatMessages((prev) => [...prev, {id: botMessageId, sender: 'bot', message: '...'}])

        const response = await fetch("/api/chatbot", {
            method: "POST",
            headers: {
                "Content-Type" : "application-json"
            },
            body: JSON.stringify({ prompt: prompt })
        })

        if (!response.ok){
            alert("Failed to get response from chatbot");
            return;
        }

        const data  = await response.json();
        const botReply = data.response;

        setTimeout(() => {
            setChatMessages((prev) => 
            prev.map((msg) => 
                msg.id === botMessageId ? {...msg, message : botReply} : msg
            )
            )
            setOnSendingPromp(false);
        }, 1500);

       }catch{
            alert('there is an error')
       }
       
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    
        if (event.key === 'Enter' && !(onSendingPrompt || !chatInput.trim())) {
            onSubmitMessage();
        }
    };

    return(
        <motion.div 
        key="chatbot"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.2 }}
        className="h-[580px] w-96 border border-gray-300  dark:border-gray-200/20  rounded-md mb-1 shadow-md bg-white dark:bg-black flex flex-col ">
            <div className='border-b-[1px] dark:border-b-white/30 border-gray-300 px-4 py-3 flex justify-between items-center'>
                <div className='flex gap-2 bg flex-1 '>
                    <Image src={ my_pic_square} alt='my_pic' width={35} height={35} className='rounded-full' objectFit='cover' />
                    <div className='font-geist_sans font-bold text-sm pt-[2px] relative flex-1 '>
                        <div className='text-gray-800 dark:text-white'>Chat with Rainier</div>
                        <div className='absolute bottom-0 mb-0.5 left-0 text-[10px] text-gray-700 flex items-center gap-1 leading-0 dark:text-white'>
                            <motion.div
                
                            className='h-[6px] w-[6px] bg-green-600 dark:bg-green-300 rounded-full animate-pulse'/>
                            Online
                        </div>
                    </div>
                </div>

                <button className="text-gray-400 cursor-pointer" onClick={handleExit}>
                    <X size={20} strokeWidth={1.75} />
                </button>
            </div>

            <div  
             className='flex-1 px-4 py-4  overflow-y-scroll scroll-smooth [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-lg'>
                <AnimatePresence>
              {
                chatMessages.map((msg) => (
                    <motion.div
                    initial = {{x: msg.sender === "bot" ? -5 : 5}}
                    animate = {{ x : 0 }}
                     key={msg.id} className={`flex flex-col ${msg.sender === "bot" ? 'items-start' : 'items-end'} mb-4`}>
                        <div className='flex text-xs font-geist_sans font-medium items-center gap-2'>
                        <Image src={msg.sender === 'bot' ? my_pic_square : no_pic} width={30} height={30} alt='my_pic' className='rounded-full'/>
                         { msg.sender === "bot" ? 'Rainier Sapin' : '' }
                        </div>

                        {
                            msg.id === 1 ? (
                                <div 
                                className='bg-gray-100 p-2 mt-2 rounded-md w-3/4 text-sm font-geist_sans dark:bg-slate-600'>
                                    {msg.message}
                                </div>
                            ) : (
                       
                                    <motion.div
                                        key={msg.id + msg.message[0]}
                                        initial={{ opacity: 0 }}
                                        animate={{  opacity: 1 }} 
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                    
                                        className={`bg-gray-100 p-2 mt-2 rounded-md  text-sm font-geist_sans dark:bg-slate-600
                                        ${(msg.sender === 'bot' && msg.message !== '...') ? 'w-3/4' : 'w-max'}
                                        `}>
                                           {
                                           msg.message !== "..." ? msg.message : (
                                            <div className='loader-chatbot-message dark'></div>
                                           )
                                           }
                                    </motion.div>
                                
                            )
                        }
                    </motion.div>
                ))
              }
              </AnimatePresence>

              <div ref={toScrollRef} className='bg-transparent h-5'></div>
            </div>

            <div className='flex justify-between mx-3 py-2 gap-1 border-t border-gray-400 mb-4'>
                <input type="text" value={chatInput} 
                onKeyDown={handleKeyDown}
                onChange={(e) => setChatInput(e.target.value)} placeholder='Type Message' className='flex-1 outline-0 font-inter text-sm' />
                <button className='cursor-pointer outline-0' onClick={onSubmitMessage} disabled={onSendingPrompt || !chatInput.trim()}>
                    <SendHorizontal size={20} strokeWidth={1.75} 
                    className={`${(!chatInput.trim() || onSendingPrompt) ? 'text-gray-500 dark:text-slate-400' : 'text-gray-800 dark:text-teal-50'} transition-colors `}/>
                </button>
            </div>

            <div className='text-xs font-inter font-medium text-gray-600 dark:text-teal-50 px-2 py-1 flex gap-1 items-center justify-center'>
                Powered By 
                <div className='flex items-center gap-0.5'>
                    Google Gemini  
                    <motion.span
                    initial = {{scale: 0.9}}
                    animate = {{scale: 1}}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", repeatDelay: 0.5 }} 
                    > <Image width={16} height={16} src='/google-gemini.svg' alt='Google Gemini' /> </motion.span>
                    </div>
            </div>
        </motion.div>
    )
}

export default ChatBox;