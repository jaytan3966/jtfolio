"use client";
import { TypeAnimation } from "react-type-animation";

export default function Experience() {
    return (
        <div className="flex flex-col p-8">
            <TypeAnimation sequence={["> ", 120,"> E", 120, "> Ex", 120, "> Exp", 120, "> Expe", 120, "> Exper", 120, "> Experi", 120, "> Experie", 120, "> Experien", 120, "> Experienc", 120, "> Experience", 120]} speed={15} cursor={false} className="text-6xl"/>
        </div>
    );
}