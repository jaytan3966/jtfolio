"use client";
import { useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";
import { useInView } from "react-intersection-observer";
import { useTheme } from "@/app/context/themecontext";

export default function Experience() {
    const info = {"Name":"Jay Young", "Email":"jay2young@gmail.com", "Company":"UCSB College of Engineering", "Message": "I love you"};

    const { ref, inView } = useInView({
        threshold: 0.1,
    });

    const [isTransitioning, setIsTransitioning] = useState(true);
    const {isDarkMode} = useTheme();

    useEffect(() => {
            if (inView){
                setIsTransitioning(false);
            } else {
                setIsTransitioning(true);
            }
        }, [inView]);
    
    return (
        <div className="flex flex-col px-2 pt-4 min-h-screen">
            <div ref={ref} className="flex mb-6 font-bold text-6xl">
                <h1 className="mr-2 md:mr-4">{"> "}</h1>
                {inView && (
                    <TypeAnimation 
                    sequence={[
                        "", 80,
                        "C", 80, 
                        "Co", 80, 
                        "Con", 80, 
                        "Cont", 80, 
                        "Conta", 80, 
                        "Contac", 80, 
                        "Contact", 80]} 
                        speed={75} 
                        cursor={false} 
                        />
                )}
            </div>
            <div ref={ref} className={`box-border border-4 rounded-sm max-w-[97vw] min-h-[86vh] ${isDarkMode ? "border-white" : "border-black"} ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'} transition-all duration-600`}>
                <div className="mx-6 my-3 font-bold flex items-end text-center">
                    <h1 className="text-xl md:text-3xl">{"<"}Form{">"}</h1>
                </div>
                {Object.entries(info).map(([name, placeholders], i) => {
                    return (
                        <div className="mx-[5vw] my-[2vh] max-h-[33vh] font-bold flex flex-col" key={i}>
                            {name !== "Message" ? (
                                <div className="gap-4">
                                    <h1 className="text-lg md:text-2xl">{"<"}{name}{"/>"}</h1>
                                    <div className="flex items-center justify-center">
                                        <input type="text" placeholder={placeholders} className={`text-center placeholder:text-center placeholder:text-sm mt-2 min-w-[85vw] max-w-[90vw] h-[5vh] box-border border-4 ${isDarkMode ? "border-white text-white" : "border-black text-black"}`}></input>
                                    </div>
                                </div>
                            ) : (
                                <div className="gap-4">
                                    <h1 className="text-lg md:text-2xl">{"<"}{name}{"/>"}</h1>
                                    <div className="flex items-center justify-center">
                                        <textarea placeholder={placeholders} className={`text-center text-wrap placeholder:text-center placeholder:text-sm mt-2 min-w-[85vw] max-w-[90vw] h-[20vh] md:h-[27vh] box-border border-4 ${isDarkMode ? "border-white text-white" : "border-black text-black"}`}></textarea>
                                    </div>
                                </div>
                            )}
                            
                        </div>
                    )
                })}
                <div className="flex items-center justify-center">
                    <button className={`font-bold gap-4 text-center box-border border-4 min-w-[85vw] max-w-[90vw] h-[50px] ${isDarkMode ? "border-white hover:bg-white hover:text-black" : "border-black hover:bg-black hover:text-white"} transition-all duration-500`} >Submit</button>
                </div>
                <div className="mx-6 my-3 font-bold flex items-end text-center">
                    <h1 className="text-xl md:text-3xl">{"<"}Form{"/>"}</h1>
                </div>
            </div>
        </div>
    );
}

