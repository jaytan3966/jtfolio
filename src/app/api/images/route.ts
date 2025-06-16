import { NextResponse } from "next/server";
import { GetObjectCommandInput } from "@aws-sdk/client-s3";

export async function GET(request: Request){
    const { searchParams } = new URL(request.url);
    const entityType = searchParams.get('type') as string;
    const name = searchParams.get('name') as string;

    try {
        const input: GetObjectCommandInput = {
            Bucket: "jtfolio-imgs",
            Key: `jtfolio-${entityType}/${name}.png`
        };
        const url = `https://${input.Bucket}.s3.amazonaws.com/${input.Key}`;
        return new NextResponse(url);
    } catch (error) {
        console.error(error);
    }
}