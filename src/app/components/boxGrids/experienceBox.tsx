"use client"
import { useEffect, useState } from "react";
import { useTheme } from "@/app/context/themecontext";
import { useInView } from "react-intersection-observer";
import Link from "next/link";

export default function ExperienceBox(){
    
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
    const skills = ["Communication", "Teamwork", "Mentorship", "Initiative", "Problem Solving", "Leadership"];

    return (
        <div ref={ref} className={`box-border border-4 rounded-sm max-w-[40vw] ${isDarkMode ? "border-white" : "border-black"} ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'} transition-all duration-600`}>
            <Link 
                href={"https://www.codeninjas.com/ca-folsom"} 
                target="_blank" 
                className="flex-shrink-0 relative group overflow-hidden"
                >
                <div className="relative">
                    <img 
                    title="View this company"
                    src="https://4kids.com/wp-content/uploads/2021/01/MdFdBdCFsFJGQ2GQtkTvUZ08n.jpg"
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
            <div className="mx-3 my-2 font-bold flex items-end text-center">
                <h1 className="text-lg md:text-xl">{"<"}CodeNinjas Folsom title="Coding Instructor"{">"}</h1>
            </div>
            
            <p className={`text-center mb-2 mx-2 ${isDarkMode ? "text-gray-400" : "text-gray-600"} transition-all duration-500`}>As a Code Sensei at Code Ninjas, I taught JavaScript and C# fundamentals to 50+ K-12 students through game development, while onboarding and training 10+ new instructors in curriculum delivery and communication strategies. Recognizing the need for better reward tracking, I took initiative to design and develop the NinjaBucks Dashboard - a platform that streamlined virtual currency management for students and instructors, showcasing my ability to identify problems and create technical solutions.</p>
            <div>
                {skills.map((name, i) => {
                    return (
                        <button 
                        className={`mx-3 my-2 px-2 py-1 box-border rounded-xl ${isDarkMode ? "bg-gray-800 text-gray-250" : "bg-gray-300 text-gray-800"} text-xs transition-all duration-500 hover:cursor-pointer`}
                        key={i}
                        >
                            {"<"}{name}{"/>"}
                        </button>
                    
                    )
                })}
            </div>
            <div className="mx-3 my-3 text-lg font-bold md:text-xl">
                <h1>{"</"}CodeNinjas{">"}</h1>
            </div>
            
        </div>
    )
}

