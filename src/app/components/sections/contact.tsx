"use client";
import { TypeAnimation } from "react-type-animation";
import { useInView } from "react-intersection-observer";

export default function Experience() {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <div className="flex flex-col px-2 py-8 min-h-screen">
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
                    speed={99} 
                    cursor={false} 
                    className="text-6xl"/>
            )}
        </div>
    </div>
    );
}

