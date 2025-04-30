"use client";
import { TypeAnimation } from "react-type-animation";
import { useInView } from "react-intersection-observer";
import { useEffect, useRef } from "react";

export default function Experience() {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const containerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (inView && containerRef.current) {
            containerRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }, [inView]);

    return (
        
        <div ref={containerRef} className="flex flex-col p-8 min-h-screen">
            <div ref={ref}>
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
    </div>
    );
}