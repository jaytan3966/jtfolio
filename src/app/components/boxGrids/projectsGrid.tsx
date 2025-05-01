"use client"
import Projectbox from "./projectBox"

export default function ProjectsGrid(){

    const count = [1,2,3,4,5,6]
    
    return (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {count.map((val, i) => {
                return (
                    <div key={i}>
                        <Projectbox/>
                    </div>
                )
            })}
        </div>
    )
}