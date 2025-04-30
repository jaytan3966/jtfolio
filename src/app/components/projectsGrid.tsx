"use client"
import Projectbox from "./projectBox"
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export default function ProjectsGrid(){

    const [isTransitioning, setIsTransitioning] = useState(true);

    const { ref, inView } = useInView({
            triggerOnce: true,
            threshold: 0.1,
        });
    
        useEffect(() => {
            if (inView){
                setIsTransitioning(false);
            }
        }, [inView]);
    return (
        <div ref={ref} className="grid grid-cols-2 gap-4 md:grid-cols-3">
            <Projectbox/>
            <Projectbox/>   
            <Projectbox/>   
            <Projectbox/>   
            <Projectbox/>   
            <Projectbox/>   
            <Projectbox/>   
            <Projectbox/>
        </div>
    )
}