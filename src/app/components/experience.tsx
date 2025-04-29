"use client";
import { TypeAnimation } from "react-type-animation";
import { useInView } from "react-intersection-observer";

export default function Experience() {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.8,
    });
    return (
        <div ref={ref} className="flex flex-col p-8 min-h-screen">
        {inView && (
            <TypeAnimation sequence={[
                "> ", 60,
                "> E", 60, 
                "> Ex", 60, 
                "> Exp", 60, 
                "> Expe", 60, 
                "> Exper", 60, 
                "> Experi", 60, 
                "> Experie", 60, 
                "> Experien", 60, 
                "> Experienc", 60, 
                "> Experience", 60]} 
                speed={15} 
                cursor={false} 
                className="text-6xl"/>
        )}
    </div>
    );
}