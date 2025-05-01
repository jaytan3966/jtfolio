"use client";
import { TypeAnimation } from "react-type-animation";
import { useInView } from "react-intersection-observer";
import ExperienceGrid from "../boxGrids/experienceGrid";

export default function Experience() {
    const { ref, inView } = useInView({
        threshold: 0.1,
    });

    return (
        <div className="flex flex-col px-2 py-4 min-h-screen">
            <div ref={ref} className="flex mb-8 font-bold text-6xl">
                <h1 className="mr-2 md:mr-4">{"> "}</h1>
                {inView && (
                    <TypeAnimation sequence={[
                        "E", 56, 
                        "Ex", 56, 
                        "Exp", 56, 
                        "Expe", 56, 
                        "Exper", 56, 
                        "Experi", 56, 
                        "Experie", 56, 
                        "Experien", 56, 
                        "Experienc", 56, 
                        "Experience", 56]} 
                        speed={75} 
                        cursor={false} 
                        />
                    )}
            </div>
            <div className="flex items-center justify-center">
                <ExperienceGrid/>
            </div>
        </div>
    );
}