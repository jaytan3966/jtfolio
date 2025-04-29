"use client";
import { TypeAnimation } from "react-type-animation";

export default function Contact() {
    return (
        <div className="flex flex-col p-8 min-h-screen">
            <TypeAnimation sequence={["> ", 180,"> C", 180, "> Co", 180, "> Con", 180, "> Cont", 180, "> Conta", 180, "> Contac", 180, "> Contact", 180]} speed={15} cursor={false} className="text-6xl"/>
        </div>
    );
}