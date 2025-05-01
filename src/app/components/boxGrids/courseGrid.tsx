"use client"
import CourseBox from "./courseBox"

export default function CourseGrid(){

    const count = [1,2,3]
        
    return (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {count.map((val) => {
                return (
                    <div key={val}>
                        <CourseBox/>
                    </div>
                )
            })}
        </div>
    )
}