"use client";
import { useEffect, useState, useRef } from "react";
import { TypeAnimation } from "react-type-animation";
import { useInView } from "react-intersection-observer";
import { useTheme } from "@/app/context/themecontext";
import { useForm } from "react-hook-form";
import { sendEmail } from "@/app/utils/send-email";

import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export type FormData = {
    name: string;
    email: string;
    company: string;
    message: string;
}
type FormField = "name" | "email" | "company" | "message";

export default function Contact() {
    const { ref, inView } = useInView({
        threshold: 0.1,
    });
    const [isTransitioning, setIsTransitioning] = useState(true);
    const {isDarkMode} = useTheme();

    useEffect(() => {
            if (inView){
                setIsTransitioning(false);
            } else {
                setIsTransitioning(true);
            }
        }, [inView]);
    
    const placeholders = {"name":"Steve Jobs", "email":"stevejobs@apple.com", "company":"Apple", "message": "Let's have a coffee chat..."};
    const {register, handleSubmit } = useForm<FormData>();

    const successful = () => toast.success("sent!", {
        style: { 
            background: isDarkMode ? "black" : "white",
            color: isDarkMode ? "white" : "black",
            border: "1px solid #2d4849", 
            fontFamily: '"Fira Code", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'},
    });
    const failed = () => toast.error("error sending email", {
        style: { 
            background: isDarkMode ? "black" : "white",
            color: isDarkMode ? "white" : "black",
            border: "1px solid #2d4849", 
            fontFamily: '"Fira Code", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'},
    });

    const formRef = useRef<HTMLFormElement>(null);

    function onSubmit(data: FormData) {
        sendEmail(data);
        successful();
        formRef.current?.reset();
    }
        
    return (
        <div className="flex flex-col px-2 pt-4 min-h-screen">
            <div ref={ref} className="flex mb-6 font-bold text-6xl">
                <h1 className="mr-2 md:mr-4">{"> "}</h1>
                {inView && (
                    <TypeAnimation 
                    sequence={[
                        "", 80,
                        "C", 80, 
                        "Co", 80, 
                        "Con", 80, 
                        "Cont", 80, 
                        "Conta", 80, 
                        "Contac", 80, 
                        "Contact", 80]} 
                        speed={75} 
                        cursor={false} 
                        />
                )}
            </div>
            <div ref={ref} className={`box-border border-4 rounded-sm max-w-[97vw] min-h-[86vh] ${isDarkMode ? "border-white" : "border-black"} ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'} transition-all duration-500`}>
                <ToastContainer position="top-right" autoClose={3000}
                                    hideProgressBar={false}
                                    newestOnTop
                                    closeOnClick
                                    rtl={false}
                                    pauseOnFocusLoss
                                    draggable
                                    pauseOnHover
                                    theme='light'
                                    className={`font-mono z-10`}/>
                <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
                    <div className="mx-6 my-3 font-bold flex items-end text-center">
                        <h1 className="text-xl md:text-3xl">{"<"}form{">"}</h1>
                    </div>
                    {(Object.entries(placeholders) as [FormField, string][]).map(([name, placeholders], i) => {
                        return (
                            <div className="mx-[5vw] my-[2vh] max-h-[33vh] font-bold flex flex-col" key={i}>
                                {name !== "message" ? (
                                    <div className="gap-4">
                                        <h1 className="text-lg md:text-2xl" title="Required">{"<"}{name}{"/>*"}</h1>
                                        <div className="flex items-center justify-center">
                                            <input
                                            {...register(name, { required: true })} 
                                            type="text" 
                                            placeholder={placeholders}
                                            className={`focus:outline-none text-center placeholder:text-center placeholder:text-sm mt-2 min-w-[85vw] max-w-[90vw] min-h-[5vh] box-border border-4 ${isDarkMode ? "border-white text-white" : "border-black text-black"} transition-all duration-500`}></input>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="gap-4">
                                        <h1 className="text-lg md:text-2xl">{"<"}{name}{"/>"}</h1>
                                        <div className="flex items-center justify-center">
                                            <textarea
                                            {...register(name, { required: true })} 
                                            placeholder={placeholders} 
                                            className={`focus:outline-none text-center text-wrap placeholder:text-center placeholder:text-sm mt-2 min-w-[85vw] max-w-[90vw] h-[20vh] md:h-[27vh] box-border border-4 ${isDarkMode ? "border-white text-white" : "border-black text-black"} transition-all duration-500`}></textarea>
                                        </div>
                                    </div>
                                )}
                                
                            </div>
                        )
                    })}
                    <div className="flex items-center justify-center">
                        <button type="submit"
                        className={`cursor-pointer font-bold gap-4 text-center box-border border-4 min-w-[85vw] max-w-[90vw] h-[50px] ${isDarkMode ? "border-white hover:bg-white hover:text-black" : "border-black hover:bg-black hover:text-white"} transition-all duration-500`} >SUBMIT</button>
                    </div>
                    <div className="mx-6 my-3 font-bold flex items-end text-center">
                        <h1 className="text-xl md:text-3xl">{"</"}form{">"}</h1>
                    </div>
                </form>
                
            </div>
        </div>
    );
}

