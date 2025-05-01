"use client"
import { useEffect, useState } from "react";
import { useTheme } from "@/app/context/themecontext";
import { useInView } from "react-intersection-observer";
import Link from "next/link";

export default function Projectbox(){
    
    const [isTransitioning, setIsTransitioning] = useState(true);

    const { ref, inView } = useInView({
        threshold: 0.1,
    });

    useEffect(() => {
        if (inView){
            setIsTransitioning(false);
        } else {
            setIsTransitioning(true);
        }
    }, [inView]);
    const {isDarkMode} = useTheme();
    const technologies = ["Tech", "Tech", "Tech", "Tech"];

    return (
        <div ref={ref} className={`box-border border-4 rounded-sm max-w-[47vw] ${isDarkMode ? "border-white" : "border-black"} ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'} transition-all duration-600`}>
            <Link href="https://github.com/jaytan3966" target="blank">
                <img title="Nyan Shibar"
                src="https://no-cdn.shortpixel.ai/client/to_avif,q_lossy,ret_wait/https://shortpixel.com/blog/wp-content/uploads/2023/12/nyan-cat.gif"
                className="w-full hover:opacity-30 hover:cursor-pointer transition-all duration-500"/> 
            </Link>
            <div className="mx-3 my-2 font-bold flex items-end text-center">
                <h1 className="text-lg md:text-xl">{"<"}Nyan Shibar id="Personal Project"{">"}</h1>
            </div>
            
            <p className={`text-center mb-2 mx-2 ${isDarkMode ? "text-gray-700" : "text-gray-500"} transition-all duration-500`}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <div>
                {technologies.map((name, i) => {
                    return (
                        <button 
                        className={`mx-3 my-2 px-2 py-1 box-border rounded-xl ${isDarkMode ? "bg-gray-800 text-gray-250" : "bg-gray-300 text-gray-800"} text-xs transition-all duration-500 hover:cursor-pointer`}
                        key={i}
                        >
                            {"<"}{name} {i+1}{"/>"}
                        </button>
                    
                    )
                })}
            </div>
            <div className="mx-3 my-3 text-xl font-bold md:text-2xl">
                <h1>{"</"}Nyan Shibar{">"}</h1>
            </div>
        </div>
    )
}