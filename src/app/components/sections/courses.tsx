"use client";
import { TypeAnimation } from "react-type-animation";
import { useInView } from "react-intersection-observer";
import CourseGrid from "../boxGrids/courseGrid";

export default function Courses() {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <div className="flex flex-col px-2 py-8 min-h-screen">
            <div ref={ref} className="mb-8 font-bold">
            {inView && (
                <TypeAnimation sequence={[
                    "> ", 90,
                    "> C", 90, 
                    "> Co", 90, 
                    "> Cou", 90, 
                    "> Cour", 90, 
                    "> Cours", 90, 
                    "> Course", 90, 
                    "> Courses", 90]} 
                    speed={99} 
                    cursor={false} 
                    className="text-6xl"/>
            )}
        </div>
        <div className="flex items-center justify-center">
            <CourseGrid/>
        </div>
    </div>
    );
}