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
            <div ref={ref} className="mb-8 font-bold">
            {inView && (
                <TypeAnimation 
                sequence={[
                    "> ", 90,
                    "> C", 90, 
                    "> Co", 90, 
                    "> Con", 90, 
                    "> Cont", 90, 
                    "> Conta", 90, 
                    "> Contac", 90, 
                    "> Contact", 90]} 
                    speed={15} 
                    cursor={false} 
                    className="text-6xl"/>
            )}
        </div>
    </div>
    );
}

