"use client"
import ExperienceBox from "./experienceBox"
import { useState, useEffect } from "react"
import { ExpProps } from "./experienceBox";

export default function ExperienceGrid(){

    const [exps, setExp] = useState<ExpProps[]>([]);

    useEffect(() => {
        async function getExp(){
            const response = await fetch("/api/db?type=EXPERIENCE");
            if (response.ok){
                const data = await response.json();
                setExp(data);
            }
        }
        getExp();
    }, [])
    
        
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 items-stretch">
            {exps.sort((a, b) => b.rigor - a.rigor).map((exp) => {
                return (
                    <div key={exp.name}>
                        <ExperienceBox name={exp.name} title={exp.title} description={exp.description} skills={exp.skills} href={exp.href} rigor={exp.rigor}/>
                    </div>
                )
            })}
        </div>
    )
}