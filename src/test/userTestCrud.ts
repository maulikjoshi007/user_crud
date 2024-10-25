import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import AWS from 'aws-sdk';

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  let response: APIGatewayProxyResult;
  const { httpMethod } = event;

  switch (httpMethod) {
    case 'POST':
      response = await createUser(event);
      break;
    case 'GET':
      response = await getUser(event);
      break;
    default:
      response = { statusCode: 405, body: 'Method Not Allowed' };
  }

  return response;
};

const createUser = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const data = JSON.parse(event.body || '{}');
  const params = {
    TableName: 'ms_user',
    Item: data,
  };

  try {
    await dynamoDb.put(params).promise();
    return { statusCode: 200, body: JSON.stringify('User created') };
  } catch (err:any) {
    return { statusCode: 500, body: JSON.stringify(err.message) };
  }
};

const getUser = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const userId = event.pathParameters?.userId;
  const params = {
    TableName: 'ms_user',
    Key: { userId },
  };

  try {
    const result = await dynamoDb.get(params).promise();
    return { statusCode: 200, body: JSON.stringify(result.Item) };
  } catch (err:any) {
    return { statusCode: 500, body: JSON.stringify(err.message) };
  }
};