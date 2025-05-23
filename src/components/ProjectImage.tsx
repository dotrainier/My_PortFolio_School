import Image, { StaticImageData } from "next/image"

type ProjectImageProps = {
    src: StaticImageData,
    addToRefs?: (node: HTMLElement | null) => void,
    altText: string;
    title: string;
    link?: string
}

export default function ProjectImage({src, addToRefs, altText, title, link} : ProjectImageProps){
    return(
        <div 
            ref={addToRefs}
            className="shadow-md e relative rounded-md flex flex-col overflow-hidden project hover:shadow-lg transition-shadow duration-300"
        >
            <div className="flex-1 relative aspect-[16/9] group"> 
                <Image 
                    src={src} 
                    alt={altText} 
                    fill 
                    className="object-cover" 
                    priority
                />
                <div className=" text-white flex justify-center items-center absolute bottom-0 inset-x-0 backdrop-blur-xs w-full opacity-0 h-0 group-hover:h-full group-hover:opacity-100 transition-all duration-200">
                   {
                    link ? (
                         <a href={link} target="_blank" className="bg-green-400 px-4 py-1 cursor-pointer rounded-md">Visit Website</a>
                    ) : (
                        <div className="bg-green-400 px-4 py-1 cursor-pointer rounded-md"> Not Available </div>
                    )
                   }
                </div>
            </div>

            <div className="py-4 px-4 font-medium dark:bg-neutral-800 dark:text-zinc-50 relative">
                {title}
            </div>
        </div>
    )
}
