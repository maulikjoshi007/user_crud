import AWS from 'aws-sdk';
import dotenv from 'dotenv';
dotenv.config()

// Update AWS configuration
AWS.config.update({
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    region: process.env.AWS_REGION
});

// Create DynamoDB DocumentClient
const dynamoDB = new AWS.DynamoDB.DocumentClient();

export default dynamoDB;
