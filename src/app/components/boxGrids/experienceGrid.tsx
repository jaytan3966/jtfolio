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
        <div className="grid gap-4 items-center justify-center">
            {exps.map((exp) => {
                return (
                    <div key={exp.name}>
                        <ExperienceBox name={exp.name} title={exp.title} description={exp.description} skills={exp.skills} href={exp.href}/>
                    </div>
                )
            })}
        </div>
    )
}