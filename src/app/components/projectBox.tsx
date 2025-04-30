"use client"
import { useEffect, useState } from "react";
import { useTheme } from "../context/themecontext"
import { useInView } from "react-intersection-observer";

export default function Projectbox(){
    
    const [isTransitioning, setIsTransitioning] = useState(true);

    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    useEffect(() => {
        if (inView){
            setIsTransitioning(false);
        }
    }, [inView]);
    const {isDarkMode} = useTheme();
    const technologies = ["ReactJS", "MongoDB", "ExpressJS", "NodeJS", "NextJS", "TailwindCSS"];

    return (
        <div ref={ref} className={`box-border border-4 rounded-sm w-[43vw] md:w-[30vw] ${isDarkMode ? "border-white" : "border-black"} ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'} transition-all duration-750`}>
            <img 
            src="https://no-cdn.shortpixel.ai/client/to_avif,q_lossy,ret_wait/https://shortpixel.com/blog/wp-content/uploads/2023/12/nyan-cat.gif"
            className="w-full"/> 
            <div className="mx-3 my-2 text-xl font-bold md:text-2xl">
                <h1>{"<"}Nyan Shibar{">"}</h1>
            </div>
            
            <p className="text-center mb-2 mx-2 text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <div>
                {technologies.map((name, i) => {
                    return (
                        <button className="mx-3 my-1 px-1 py-1 box-border border-2 rounded-3xl bg-gray-500 text-black text-xs" key={i}>{"<"}{name}{"/>"}</button>
                    )
                })}
                
            </div>
            
        </div>
    )
}