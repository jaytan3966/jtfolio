"use client"
import { useEffect, useState } from "react";
import { useTheme } from "@/app/context/themecontext";
import { useInView } from "react-intersection-observer";
import Link from "next/link";

export interface ProjectboxProps {
    name: string;
    date: string;
    description: string;
    techs: string[];
    url: string;
    gif: string;
}

export default function Projectbox({ name, date, description, techs, url, gif}: ProjectboxProps) {
    const [isTransitioning, setIsTransitioning] = useState(true);
    const { ref, inView } = useInView({ threshold: 0.1 });
    const { isDarkMode } = useTheme();

    useEffect(() => {
        setIsTransitioning(!inView);
    }, [inView]);

    return (
        <div 
            ref={ref}
            className={`box-border border-4 flex flex-col rounded-sm max-w-[47vw] h-full ${
                isDarkMode ? "border-white" : "border-black"
            } ${
                isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
            } transition-all duration-600`}
        >
            <Link 
                href={`${url}`} 
                target="_blank" 
                className="flex-shrink-0 relative group overflow-hidden"
                >
                <div className="relative">
                    <img 
                    title={`View ${name}`}
                    src={`${gif}`}
                    className="w-full group-hover:opacity-30 hover:cursor-pointer transition-all duration-500"
                    />

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <svg 
                            className="w-12 h-12 bg-black/50 rounded-full p-2 text-white"
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                            />
                        </svg>
                    </div>
                </div>
            </Link>
            
            <div className="flex-grow flex flex-col p-2">

                <h1 className="text-lg lg:text-xl font-bold">{"<"}{name} created="{date}"{">"}</h1>

                <div className="flex-grow min-h-[60px] my-2 overflow-y-auto">
                    <p className={`text-center ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                        {description}
                    </p>
                </div>
                
                <div className="flex flex-wrap gap-x-5 gap-y-2 m-3">
                    {techs.map((tech, i) => (
                        <button 
                            className={`px-2 py-1 rounded-xl text-xs ${
                                isDarkMode ? "bg-gray-800 text-gray-250" : "bg-gray-300 text-gray-800"
                            } transition-all duration-500 hover:cursor-pointer`}
                            key={i}
                        >
                            {"<"}{tech}{"/>"}
                        </button>
                    ))}
                </div>
                
                <h1 className="text-lg lg:text-xl font-bold">{"</"}{name}{">"}</h1>

            </div>
        </div>
    )
}