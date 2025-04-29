"use client";
import { TypeAnimation } from "react-type-animation";

export default function Projects() {
    return (
        <div className="flex flex-col p-8 min-h-screen">
            <TypeAnimation sequence={["> ", 160,"> P", 160, "> Pr", 160, "> Pro", 160, "> Proj", 160, "> Proje", 160, "> Projec", 160, "> Project", 160, "> Projects", 160]} speed={15} cursor={false} className="text-6xl"/>
        </div>
    );
}