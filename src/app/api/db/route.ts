import { getItems } from "@/app/utils/dbFetch";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const entityType = searchParams.get('type') as string;
    const items = await getItems(entityType);
    return Response.json(items);
}