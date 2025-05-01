"use client"
import ExperienceBox from "./experienceBox"

export default function ExperienceGrid(){

    const count = [1,2]
        
    return (
        <div className="grid grid-cols-2 gap-4">
            {count.map((val) => {
                return (
                    <div key={val}>
                        <ExperienceBox/>
                    </div>
                )
            })}
        </div>
    )
}