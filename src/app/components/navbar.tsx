"use client";
import { useTheme } from "../context/themecontext";
export interface NavbarProps {
    aboutRef: React.RefObject<HTMLDivElement | null>;
    projectsRef: React.RefObject<HTMLDivElement | null>;
    expRef: React.RefObject<HTMLDivElement | null>;
    courseRef: React.RefObject<HTMLDivElement | null>;
    contactRef: React.RefObject<HTMLDivElement | null>;
}
  
export const handleScrollDown = (
    ref: React.RefObject<HTMLDivElement | null>
    ) => {
    if (ref.current) {
        window.scrollTo({
        top: ref.current.offsetTop,
        behavior: "smooth",
        });
    }
};

export const handleRefresh = () => {
    window.location.reload();
}

export default function Navbar({projectsRef, expRef, courseRef, contactRef}: NavbarProps) {
    const { isDarkMode, toggleTheme } = useTheme();

    return (
        <div className={`flex fixed justify-between items-center w-[100%] top-0 left-0 text-l md:text-xl font-mono p-4 md:p-6`}>
            <div className="flex space-x-2 md:space-x-8">
                <button onClick={() => handleRefresh()} className="cursor-pointer hover:font-bold hover:scale-110 transition-all duration-500 text-sm md:text-xl" title="Refresh Page">Jayden Tan</button>
                <button onClick={() => handleScrollDown(projectsRef)} className="cursor-pointer hover:font-bold hover:scale-110 transition-all duration-500 text-sm md:text-xl" title="Check out Jayden's Projects">Projects</button>
                <button onClick={() => handleScrollDown(expRef)} className="cursor-pointer hover:font-bold hover:scale-110 transition-all duration-500 text-sm md:text-xl" title="Take a look at Jayden's Experience">Experience</button>
                <button onClick={() => handleScrollDown(courseRef)} className="cursor-pointer hover:font-bold hover:scale-110 transition-all duration-500 text-sm md:text-xl" title="See Jayden's Courses">Courses</button>
                <button onClick={() => handleScrollDown(contactRef)} className="cursor-pointer hover:font-bold hover:scale-110 transition-all duration-500 text-sm md:text-xl" title="Contact Jayden">Contact</button>
            </div>

            <button
                onClick={toggleTheme}
                className={`
                    relative w-9 h-6 md:w-14 md:h-8 rounded-full p-1 transition-all duration-400 cursor-pointer
                    ${isDarkMode ? 'bg-black shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] ring-gray-400/20' : 'bg-white shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] ring-gray-600/30'}
                    ring-1 hover:ring-2
                        shadow-lg hover:shadow-xl
                        active:scale-[0.98]`}
                aria-label={`Toggle ${isDarkMode ? 'light' : 'dark'} mode`}
                >
                <div
                    className={`
                    w-4 h-4 md:w-6 md:h-6 rounded-full transform transition-all duration-400
                    ${isDarkMode ? 'translate-x-3 md:translate-x-6' : 'md:translate-x-0'}
                    flex items-center justify-center hover:scale-110 
                    `}
                >
                    {isDarkMode ? (
                        <svg className="w-9 h-9 md:w-10 md:h-10 text-white shadow-[0_1px_3px_rgba(0,0,0,0.1)" fill="currentColor" viewBox="0 0 20 20">
                            <title className="font-mono">Turn on Light Mode</title>
                            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/>
                        </svg>
                    ) : (
                    
                    <svg className="w-9 h-9 md:w-10 md:h-10 text-black shadow-[0_1px_3px_rgba(0,0,0,0.1)" fill="currentColor" viewBox="0 0 20 20">
                        <title className="font-mono">Turn on Night Mode</title>
                        <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                    </svg>
                    )}
                </div>
            </button>
            
        </div>
    );
}