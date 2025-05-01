"use client";
import { TypeAnimation } from "react-type-animation";
import { useInView } from "react-intersection-observer";

export default function Experience() {
    const { ref, inView } = useInView({
        threshold: 0.1,
    });

    return (
        <div className="flex flex-col px-2 py-4 min-h-screen">
            <div ref={ref} className="flex mb-8 font-bold text-6xl">
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
        </div>
    );
}

