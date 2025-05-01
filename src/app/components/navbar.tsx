"use client";
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

export default function Navbar({projectsRef, expRef, courseRef, contactRef}: NavbarProps) {

    const handleRefresh = () => {
      window.location.reload();
    }
    return (
        <div className={`flex fixed justify-between w-[100%] top-0 left-0 text-l md:text-xl font-mono p-4 md:p-6`}>
            <div className="flex space-x-5 md:space-x-8">
                <button onClick={() => handleRefresh()} className="cursor-pointer hover:font-bold hover:scale-110 transition-all duration-500" title="Refresh Page">Jayden Tan</button>
                <button onClick={() => handleScrollDown(projectsRef)} className="cursor-pointer hover:font-bold hover:scale-110 transition-all duration-500" title="Check out Jayden's Projects">Projects</button>
                <button onClick={() => handleScrollDown(expRef)} className="cursor-pointer hover:font-bold hover:scale-110 transition-all duration-500" title="Take a look at Jayden's Experience">Experience</button>
                <button onClick={() => handleScrollDown(courseRef)} className="cursor-pointer hover:font-bold hover:scale-110 transition-all duration-500" title="See Jayden's Courses">Courses</button>
                <button onClick={() => handleScrollDown(contactRef)} className="cursor-pointer hover:font-bold hover:scale-110 transition-all duration-500" title="Contact Jayden">Contact</button>
            </div>
            
        </div>
    );
}