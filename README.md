# user_crud

# DynamoDB User CRUD API

## Overview
The **DynamoDB User CRUD API** is a RESTful API built using Node.js that allows for Create, Read, Update, and Delete (CRUD) operations on user data stored in Amazon DynamoDB. This API provides endpoints to manage user information securely and efficiently.

## Features
- User creation, retrieval, updating, and deletion.
- Utilizes AWS DynamoDB for efficient and scalable data storage.
- CORS support for cross-origin requests.

## Technologies
- Node.js
- AWS Lambda
- Amazon DynamoDB
- AWS SDK
- Express.js (if used for routing)
- Jest (for testing)

## Prerequisites
- An AWS account with access to DynamoDB.
- Node.js (version 14 or later) installed on your local machine.
- npm (Node Package Manager) installed.

## Installation
1. **Clone the repository**:
   ```bash
   git clone https://github.com/maulikjoshi007/user_crud.git
   cd user_crud
   ``` 

2.  **Install dependencies**:
    
```bash
	npm install
   ```

## Environment Configuration

Create a `.env` file in the root directory and add the following configurations:

```bash
# DATABASE CONFIGURATION - DEV
AUTH_KEY="<your-aws-authkey>"  # aws auth key
AWS_REGION="<your-aws-region>"  # aws region
AWS_ACCESS_KEY="<your-aws-access-key>" #aws access key
AWS_SECRET_ACCESS_KEY = "<your-aws-secret-key>" #aws secret key
```
### Description of Environment Variables:

-   **`AUTH_KEY`**:
    
    -   This variable typically holds an authentication key used to access AWS services or APIs securely. It is essential for ensuring that requests made to AWS resources are authenticated and authorized.
-   **`AWS_REGION`**:
    
    -   Specifies the AWS region in which your resources (like DynamoDB tables, Lambda functions, etc.) are deployed. Different regions have different availability and pricing, so this variable helps in directing API requests to the correct regional endpoint.
-   **`AWS_ACCESS_KEY`**:
    
    -   This is your AWS access key ID, which uniquely identifies your AWS account. It is required for programmatic access to AWS services through the AWS SDK or CLI.
-   **`AWS_SECRET_ACCESS_KEY`**:
    
    -   This is your AWS secret access key, which works in conjunction with the access key ID to sign programmatic requests to AWS. It must be kept secret and secure, as anyone with access to this key can potentially perform actions on your AWS account.

### Important Note:

-   Make sure to **never** expose your AWS keys in public repositories or front-end code. Use environment variables or secure storage mechanisms to manage these sensitive credentials.

## AWS Setup

1.  **Create a DynamoDB Table**:
    
    -   Go to the DynamoDB service in the AWS Management Console.
    -   Create a new table named `Users` with `uuid` as the partition key.
    
2.  **Deploy Lambda Function**:
	    
    -   Use the AWS CLI or the AWS Management Console to create a new Lambda function.
    -   Upload the code from your project or link it to the repository.
    -   Set the appropriate environment variables in the Lambda function configuration.
    
  
## API Endpoints
#### Users

-   **POST** `/users/create` - Create a new user with the provided details.
-   **GET** `/users/:uuid` - Retrieve a specific user by UUID.
-   **PUT** `/users/update` - Update the details of a specific user by UUID.
-   **DELETE** `/users/delete?uuid={{uuid}}` - Delete a specific user by UUID.

## Usage

After deploying your Lambda function and API Gateway, you can interact with the API using tools like Postman or cURL.

 
## Testing
 Run your Test Case 
    ```npm run test
    ```



## Scripts to Deploy Lambda Function
``` bash
 1. npm run build // For Create Build
 2. npm run package // For create zip file for uploading on lambda function
