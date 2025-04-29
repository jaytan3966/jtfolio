"use client";
import { TypeAnimation } from "react-type-animation";
import { useInView } from "react-intersection-observer";

export default function Contact() {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.8,
    });

    return (
        <div ref={ref} className="flex flex-col p-8 min-h-screen">
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
    );
}