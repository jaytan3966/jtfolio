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
interface GitHubApiResponse {
    name: string;
    description: string | null;
    created_at: string;
    topics: string[];
    html_url: string;
    homepage: string | null;
} 

async function getGitInfo(): Promise<GitHubProject[]> {
    const response = await fetch("https://api.github.com/users/jaytan3966/repos", {
        headers: {
            'Authorization': `${process.env.GITHUB_TOKEN}`,
        }
    });
    const data: GitHubApiResponse[] = await response.json();

    // Create and sort in one step without storing rawDate
    return data
        .map((project) => ({
            name: project.name,
            description: project.description || '',
            rawDate: project.created_at,
            date: formatDate(new Date(project.created_at)),
            techs: project.topics,
            url: project.html_url,
            gif: project.homepage || '',
        }))
        .sort((a, b) => new Date(b.rawDate).getTime() - new Date(a.rawDate).getTime());
}

function formatDate(date: Date): string {
    return `${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;
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