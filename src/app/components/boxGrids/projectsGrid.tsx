"use client"
import Projectbox from "./projectBox"
import { useEffect, useState } from "react";
import { ProjectboxProps } from "./projectBox";
interface GitHubProject {
    name: string;
    description: string;
    date: string;
    techs: string[];
    url: string;
    gif: string;
}

interface ProjectWithRawDate extends GitHubProject {
    rawDate: Date; 
}
  

async function getGitInfo(){
    const response = await fetch("https://api.github.com/users/jaytan3966/repos", {
        headers: {
            'Authorization': `${process.env.GITHUB_TOKEN}`,
        }
    });
    const data = await response.json();

    const projects: ProjectWithRawDate[] = data.map((project: any) => {
    const date = new Date(project.created_at);
    return {
        name: project.name,
        description: project.description,
        date: `${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`,
        techs: project.topics,
        url: project.html_url,
        gif: project.homepage,
        rawDate: date
    };
    });

    projects.sort((a, b) => b.rawDate.getTime() - a.rawDate.getTime());

    const sortedProjects: GitHubProject[] = projects.map(({ rawDate, ...rest }) => rest);

    return sortedProjects;
}

export default function ProjectsGrid(){

    const [projects, setProjects] = useState<ProjectboxProps[]>([]);
    
    useEffect(() => {
        const fetchGit = async () => {
            const projects = await getGitInfo();
            setProjects(projects);
        };
        fetchGit();
    }, []);

    useEffect(() => {
        async function getProjs(){
            const response = await fetch("/api/db?type=PROJECT");
            if (response.ok){
                const data = await response.json();
                return data;
            }
        }
        getProjs();
    }, []);
    
    return (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 items-stretch">
            {projects.map((proj) => {
                return (
                    <div key={proj.name}>
                        <Projectbox name={proj.name} date={proj.date} description={proj.description} techs={proj.techs} url={proj.url} gif={proj.gif}/>
                    </div>
                )
            })}
        </div>
    )
}