"use client";
import { handleScrollDown, NavbarProps } from "./navbar";
import { useTheme } from "../context/themecontext";
import { TypeAnimation } from "react-type-animation";
import { useInView } from "react-intersection-observer";

export default function Introduction({projectsRef, expRef, openContact}: NavbarProps) {
    const {isDarkMode} = useTheme();
    const { ref, inView } = useInView({
        threshold: 0.1,
    });
    
    return (
        <div className="p-8 min-h-screen grid md:grid-cols-2 items-center justify-center text-center text-wrap">
            <div ref={ref}>
                {inView && (<TypeAnimation
                        sequence={[
                            "H", 50,
                            "He", 50,
                            "Hey", 50,
                            "Hey,", 50,
                            "Hey, I", 50,
                            "Hey, I'm", 50,
                            "Hey, I'm J", 50,
                            "Hey, I'm Ja", 50,
                            "Hey, I'm Jay", 50,
                            "Hey, I'm Jayd", 50,
                            "Hey, I'm Jayde", 50,
                            "Hey, I'm Jayden", 50,
                            "Hey, I'm Jayden!", 50,
                        ]}
                        speed={79}
                        cursor={false}
                        className="text-6xl lg:text-7xl font-bold mb-4"
                    />
                    )}
            </div>
            <div className="md:text-lg lg:text-2xl">
                <h2 className="mb-4">Thanks for stopping by! I&apos;m a CS junior at UC Santa Barbara, drawn to backend engineering and AI systems — lately, that&apos;s meant building data pipelines, LLM integrations, and full-stack applications.</h2>
                <h2 className="mb-4">This summer, I&apos;ll be joining Visa as a Software Engineering Intern. Right now, I&apos;m working with Unwrap.ai on a social media relevancy classifier for clients like Lululemon and Lyft, and developing .NET web apps at UCSB ITS.</h2>
                <h2 className="mb-4">Outside of coding, I enjoy watching movies, playing tennis, and listening to music.</h2>
                <div className="flex flex-wrap text-center justify-center mb-4">
                    <h2>Check out my&nbsp;</h2>
                    <button onClick={() => handleScrollDown(projectsRef)} className={`cursor-pointer relative font-medium hover:font-bold transition-all duration-300 after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:w-0 after:h-px after:transition-all after:duration-300 hover:after:w-full ${isDarkMode ? "after:bg-white" : "after:bg-black"}`}>projects</button>
                    <h2>,&nbsp;</h2>
                    <button onClick={() => handleScrollDown(expRef)} className={`cursor-pointer relative font-medium hover:font-bold transition-all duration-300 after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:w-0 after:h-px after:transition-all after:duration-300 hover:after:w-full ${isDarkMode ? "after:bg-white" : "after:bg-black"}`}>experiences</button>
                    <h2>,&nbsp;or&nbsp;</h2>
                    <button onClick={openContact} className={`cursor-pointer relative font-medium hover:font-bold transition-all duration-300 after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:w-0 after:h-px after:transition-all after:duration-300 hover:after:w-full ${isDarkMode ? "after:bg-white" : "after:bg-black"}`}>contact</button>
                    <h2>&nbsp;me.</h2>
                </div>
            </div>
        </div>
    )
}