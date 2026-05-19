import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DeleteCommand,
  DynamoDBDocumentClient,
  PutCommand,
  QueryCommand,
} from "@aws-sdk/lib-dynamodb";

export const TABLE_NAME = "JTFolio";

const dbClient = new DynamoDBClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.DYNAMODB_ACCESS_KEY as string,
    secretAccessKey: process.env.DYNAMODB_SECRET_KEY as string,
  },
});

export const docClient = DynamoDBDocumentClient.from(dbClient);

export type DynamoDBItem = {
  entityType: string;
  name: string;
  [key: string]: unknown;
};

export async function getItems(entityType: string): Promise<DynamoDBItem[]> {
  const command = new QueryCommand({
    TableName: TABLE_NAME,
    KeyConditionExpression: "entityType = :entityType",
    ExpressionAttributeValues: {
      ":entityType": entityType,
    },
  });

  const response = await docClient.send(command);
  return (response.Items as DynamoDBItem[]) ?? [];
}

export async function putItem(item: DynamoDBItem): Promise<void> {
  await docClient.send(
    new PutCommand({
      TableName: TABLE_NAME,
      Item: item,
    }),
  );
}

export async function createItemIfNotExists(item: DynamoDBItem): Promise<boolean> {
  try {
    await docClient.send(
      new PutCommand({
        TableName: TABLE_NAME,
        Item: item,
        ConditionExpression: "attribute_not_exists(#et) AND attribute_not_exists(#n)",
        ExpressionAttributeNames: {
          "#et": "entityType",
          "#n": "name",
        },
      }),
    );
    return true;
  } catch (err) {
    if ((err as { name?: string })?.name === "ConditionalCheckFailedException") {
      return false;
    }
    throw err;
  }
}

export async function deleteItem(entityType: string, name: string): Promise<void> {
  await docClient.send(
    new DeleteCommand({
      TableName: TABLE_NAME,
      Key: { entityType, name },
    }),
  );
}
