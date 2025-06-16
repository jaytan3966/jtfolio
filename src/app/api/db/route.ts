import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, QueryCommand } from "@aws-sdk/lib-dynamodb";

type DynamoDBItem = {
  entityType: string;
  [key: string]: unknown;
};

const dbClient = new DynamoDBClient({
  region: process.env.NEXT_PUBLIC_AWS_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_DYNAMODB_ACCESS_KEY as string,
    secretAccessKey: process.env.NEXT_PUBLIC_DYNAMODB_SECRET_KEY as string,
  },
});

const docClient = DynamoDBDocumentClient.from(dbClient);

const getItems = async (entityType: string): Promise<DynamoDBItem[]> => {
  const command = new QueryCommand({
    TableName: "JTFolio",
    KeyConditionExpression: "entityType = :entityType",
    ExpressionAttributeValues: {
      ":entityType": entityType
    }
  });

  try {
    const response = await docClient.send(command);
    return response.Items as DynamoDBItem[] || [];
  } catch (error) {
    console.error("DynamoDB query error:", error);
    throw new Error("Failed to fetch items from DynamoDB");
  }
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const entityType = searchParams.get('type');
    
    if (!entityType) {
      return new Response(JSON.stringify({ error: "Type parameter is required" }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const items = await getItems(entityType);
    return new Response(JSON.stringify(items), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("API route error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}