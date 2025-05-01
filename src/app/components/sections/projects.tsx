"use client";
import { TypeAnimation } from "react-type-animation";
import { useInView } from "react-intersection-observer";
import ProjectsGrid from "../boxGrids/projectsGrid";

export default function Projects() {
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
                            "> ", 80,
                            "> P", 80,
                            "> Pr", 80,
                            "> Pro", 80,
                            "> Proj", 80,
                            "> Proje", 80,
                            "> Projec", 80,
                            "> Project", 80,
                            "> Projects", 80,
                        ]}
                        speed={99}
                        cursor={false}
                        className="text-6xl"
                    />
                    
                )}
            </div>
            <div className="flex items-center justify-center">
                 <ProjectsGrid/>
            </div>
        </div>
    );
}