"use client";
import { TypeAnimation } from "react-type-animation";
import { useInView } from "react-intersection-observer";
import CourseGrid from "../boxGrids/courseGrid";

export default function Courses() {
    const { ref, inView } = useInView({
        threshold: 0.1,
    });

    return (
        <div className="flex flex-col px-2 pt-4 min-h-screen">
            <div ref={ref} className="flex mb-6 font-bold text-6xl">
                <h1 className="mr-2 md:mr-4">{"> "}</h1>
                {inView && (
                    <TypeAnimation sequence={[
                        "", 80,
                        "C", 80, 
                        "Co", 80, 
                        "Cou", 80, 
                        "Cour", 80, 
                        "Cours", 80, 
                        "Course", 80, 
                        "Courses", 80]} 
                        speed={75} 
                        cursor={false} 
                        />
                )}
            </div>
            <div className="flex items-center justify-center">
                <CourseGrid/>
            </div>
        </div>
    );
}