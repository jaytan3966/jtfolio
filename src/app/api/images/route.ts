import { NextResponse } from "next/server";
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";

const s3 = new S3Client({
    credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_DYNAMODB_ACCESS_KEY as string, 
        secretAccessKey: process.env.NEXT_PUBLIC_DYNAMODB_SECRET_KEY as string,
    },
    region: process.env.NEXT_PUBLIC_AWS_REGION
});

export async function GET(request: Request){
    const { searchParams } = new URL(request.url);
    const entityType = searchParams.get('type') as string;
    const name = searchParams.get('name') as string;

    try {
        const command = new GetObjectCommand({
            Bucket: "jtfolio-imgs",
            Key: `jtfolio-${entityType}/${name}.png`
        })
        const {Bucket, Key} = (command as any).input
        const url = `https://${Bucket}.s3.amazonaws.com/${Key}`;
        return new NextResponse(url);
    } catch (error) {
        console.error(error);
    }
}