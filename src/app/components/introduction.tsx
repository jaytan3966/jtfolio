"use client";
import { handleScrollDown, NavbarProps } from "./navbar";
import { useTheme } from "../context/themecontext";

export default function Introduction({projectsRef, expRef, contactRef}: NavbarProps) {
    const {isDarkMode} = useTheme();
    return (
        <div className="p-8 min-h-screen grid md:grid-cols-2 items-center justify-center text-center text-wrap">
            <h1 className="text-6xl lg:text-7xl font-bold mb-4">Hey, I'm Jayden!</h1>
            <div className="md:text-lg lg:text-2xl">
                <h2 className="mb-4">I'm a first year computer science undergraduate student at sunny UC Santa Barbara passionate about fullstack web development. Thanks for taking the time to check out my website!</h2>
                <h2 className="mb-4">When I'm not at the computer coding away, I enjoy spending my time watching movies, playing tennis (or any racquet sport), and jamming to my Spotify playlists. </h2>
                <div className="flex flex-wrap text-center justify-center"> 
                    <h2 className="mb-4">Check out my&nbsp;</h2>
                    <h2 onClick={() => handleScrollDown(projectsRef)} className={`cursor-pointer text-transparent bg-clip-text bg-gradient-to-r animate-rainbow hover:font-semibold hover:scale-110 transition-all duration-400 ${isDarkMode ? "from-red-500 to-orange-500" : "from-red-400 to-orange-400"}`}>projects,&nbsp;</h2>
                    <a onClick={() => handleScrollDown(expRef)} className={`cursor-pointer text-transparent bg-clip-text bg-gradient-to-r animate-rainbow hover:font-semibold hover:scale-110 transition-all duration-400 ${isDarkMode ? "from-orange-500 to-green-500" : "from-orange-400 to-green-400"}`}>experiences,&nbsp;</a>
                    <h2 className="mb-4">or&nbsp;</h2>
                    <a onClick={() => handleScrollDown(contactRef)} className={`cursor-pointer text-transparent bg-clip-text bg-gradient-to-r animate-rainbow hover:font-semibold hover:scale-110 transition-all duration-400 ${isDarkMode ? "from-green-500 to-blue-500" : "from-green-400 to-blue-400"}`}>contact </a>
                    <h2 className="mb-4">&nbsp;me&nbsp;below!</h2>
                </div>
            </div>
        </div>
    )
}