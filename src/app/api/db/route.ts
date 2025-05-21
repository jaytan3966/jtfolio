import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, QueryCommand } from "@aws-sdk/lib-dynamodb";

const dbClient = new DynamoDBClient({
    region: process.env.NEXT_PUBLIC_AWS_REGION ,
    credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_DYNAMODB_ACCESS_KEY as string, 
        secretAccessKey: process.env.NEXT_PUBLIC_DYNAMODB_SECRET_KEY as string,
    },
});
const docClient = DynamoDBDocumentClient.from(dbClient);

const getItems = async (entityType: string): Promise<{entityType: any}[]> => {
    const command = new QueryCommand({
        TableName: "JTFolio",
        KeyConditionExpression: "entityType = :entityType",
        ExpressionAttributeValues: {
            ":entityType": entityType
        }
    });

    try{
        const response = await docClient.send(command);
        return response.Items as {entityType: any}[] || [];
    } catch (error){
        throw error;
    }
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const entityType = searchParams.get('type') as string;
    const items = await getItems(entityType);
    return Response.json(items);
}