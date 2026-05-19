import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

export const S3_BUCKET = process.env.S3_BUCKET as string;

export const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.DYNAMODB_ACCESS_KEY as string,
    secretAccessKey: process.env.DYNAMODB_SECRET_KEY as string,
  },
});

export type ImageEntityType = "experience" | "courses";

export function imageKey(entityType: ImageEntityType, name: string): string {
  return `jtfolio-${entityType}/${name}.png`;
}

export function imageUrl(entityType: ImageEntityType, name: string): string {
  return `https://${S3_BUCKET}.s3.amazonaws.com/${imageKey(entityType, name)}`;
}

export async function uploadImage(
  entityType: ImageEntityType,
  name: string,
  body: Buffer,
  contentType: string,
): Promise<void> {
  await s3Client.send(
    new PutObjectCommand({
      Bucket: S3_BUCKET,
      Key: imageKey(entityType, name),
      Body: body,
      ContentType: contentType,
    }),
  );
}
