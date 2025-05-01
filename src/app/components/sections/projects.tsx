"use client";
import { TypeAnimation } from "react-type-animation";
import { useInView } from "react-intersection-observer";
import ProjectsGrid from "../boxGrids/projectsGrid";

export default function Projects() {

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
                            "P", 70,
                            "Pr", 70,
                            "Pro", 70,
                            "Proj", 70,
                            "Proje", 70,
                            "Projec", 70,
                            "Project", 70,
                            "Projects", 70,
                        ]}
                        speed={75}
                        cursor={false}
                    />   
                )}
            </div>
            <div className="flex items-center justify-center">
                 <ProjectsGrid/>
            </div>
        </div>
    );
}