"use client"
import CourseBox from "./courseBox"
import { useState, useEffect } from "react"
import { CourseProps } from "./courseBox";

export default function CourseGrid(){

    const [courses, setCourses] = useState<CourseProps[]>([]);
    useEffect(() => {
        async function getCourses(){
            let response = await fetch("/api/db?type=COURSES");
            if (response.ok){
                const data = await response.json();
                setCourses(data);
            }
        }
        getCourses();

    }, [])
        
    return (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {courses.map((course) => {
                return (
                    <div key={course.name}>
                        <CourseBox name={course.name} courseTitle={course.courseTitle} description={course.description} lessons={course.lessons} href={course.href}/>
                    </div>
                )
            })}
        </div>
    )
}