"use client";
import { TypeAnimation } from "react-type-animation";

function randomDelay() {
    let delay = Math.floor(Math.random() * 500) + 5150;
    return [delay, (delay-2150).toString()];
}

function getDate(){
    const date = new Date();
    let month = date.getUTCMonth() + 1;
    let returnedMonth = month.toString();
    
    if (month < 10) {
        returnedMonth = '0' + month; 
    }
    return [returnedMonth, date.getDate().toString(), date.getFullYear().toString()];
}
export default function Loading() {
    
    return (
    <div className="font-mono" style={{whiteSpace: 'pre-line' }}>
        <div className="flex">
            <h1>C:\\Users\\Jayden\\JTFolio{">"} </h1>
            <TypeAnimation sequence={[1500, 'npm run dev']} speed={50} cursor={false} style={{marginLeft: "10px"}}/>
        </div>
        <div></div>
        <TypeAnimation sequence={[2500, '\n> jtfolio@0.1.0 dev']} speed={99} cursor={false}/>
        <TypeAnimation sequence={[2600, '\n> next dev']} speed={99} cursor={false}/>
        <div></div>
        <TypeAnimation sequence={[3000, '\n▲ Next.js 15.3.1']} speed={99} cursor={false}/>
        <TypeAnimation sequence={[3000, '\n- Local: http://jaydentanfolio.com']} speed={99} cursor={false}/>
        <TypeAnimation sequence={[3000, `\n- Network: http://120.206.${getDate()[0]}.${getDate()[1]}:${getDate()[2]}`]} speed={99} cursor={false}/>
        <div></div>
        <TypeAnimation sequence={[4100, '\n✓ Starting', 160, '\n✓ Starting.', 160, '\n✓ Starting..', 160, '\n✓ Starting...']} wrapper="span" speed={60} cursor={false}/>
        <TypeAnimation sequence={[randomDelay()[0], `\n✓ Ready in ${randomDelay()[1]}ms`]} speed={70} cursor={false}/>
    </div>
    );
}