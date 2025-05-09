"use client"
import Projectbox from "./projectBox"
import { useEffect, useState } from "react";
import { ProjectboxProps } from "./projectBox";

async function getProjects(){
    const response = await fetch("https://api.github.com/users/jaytan3966/repos", {
        headers: {
            'Authorization': `${process.env.GITHUB_TOKEN}`,
        }
    });
    const data = await response.json();

    const techs = [
        ["ReactJS", "MongoDB", "ExpressJS", "NodeJS"],
        ["ReactJS", "Spotify API", "YouTube API"],
        ["NextJS", "TailwindCSS", "Typescript", "MongoDB"],
        ["ReactJS", "MongoDB", "NodeJS", "Auth0", "Gemini API"],
        ["NextJS", "TailwindCSS", "Typescript", "Github API"],
        ["Python", "Terminal"]
    ];

    const projects = data.map((project : any) => {
        const date = new Date(project.created_at);
        const month = String(date.getMonth() + 1).padStart(2, '0'); // "08"
        const year = date.getFullYear(); // "2024"
        const formattedDate = `${month}-${year}`;
        return {
            name: project.name,
            description: project.description,
            date: formattedDate,
            techs: project.topics,
            url: project.html_url,
        }
    })
    console.log(projects);
    return projects;
}

export default function ProjectsGrid(){

    const [projects, setProjects] = useState<ProjectboxProps[]>([]);
    useEffect(() => {
        const fetchProjects = async () => {
            const projects = await getProjects();
            setProjects(projects);
        };
        fetchProjects();
    }, []);
    
    const techs = [
        ["ReactJS", "MongoDB", "ExpressJS", "NodeJS"],
        ["ReactJS", "Spotify API", "YouTube API"],
        ["NextJS", "TailwindCSS", "Typescript", "MongoDB"],
        ["ReactJS", "MongoDB", "NodeJS", "Auth0", "Gemini API"],
        ["NextJS", "TailwindCSS", "Typescript", "Github API"],
        ["Python", "Terminal"]
    ];
    return (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 items-stretch">
            {projects.map((proj) => {
                return (
                    <div key={proj.name}>
                        <Projectbox name={proj.name} date={proj.date} description={proj.description} techs={proj.techs} url={proj.url}/>
                    </div>
                )
            })}
        </div>
    )
}