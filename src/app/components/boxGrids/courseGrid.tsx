"use client"
import CourseBox from "./courseBox"
import { useState, useEffect } from "react"
import { CourseProps } from "./courseBox";

export default function CourseGrid(){

    const [courses, setCourses] = useState<CourseProps[]>([]);
    useEffect(() => {
        async function getCourses(){
            const response = await fetch("/api/db?type=COURSES");
            if (response.ok){
                const data: CourseProps[] = await response.json();
                const sortedData = data.sort((a, b) => Number(b.rigor) - Number(a.rigor));
                setCourses(sortedData)
            }
        }
        getCourses();

    }, [])
        
    return (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {courses.map((course) => {
                return (
                    <div key={course.name}>
                        <CourseBox name={course.name} courseTitle={course.courseTitle} description={course.description} lessons={course.lessons} href={course.href} rigor={course.rigor}/>
                    </div>
                )
            })}
        </div>
    )
}