// const AWSMock = require('aws-sdk-mock');
// const { DynamoDB } = require('aws-sdk');
// const { handler } = require('../../src/app/user/service/addUser.service'); // Replace with actual handler file

// describe('User CRUD Lambda Function', () => {
//   beforeAll(() => {
//     // Mock AWS DynamoDB DocumentClient
//     AWSMock.mock('DynamoDB.DocumentClient', 'put', (params:any, callback:any) => {
//       callback(null, { status: 'success' });
//     });

//     AWSMock.mock('DynamoDB.DocumentClient', 'get', (params:any, callback:any) => {
//       if (params.Key.uuid === '1234') {
//         callback(null, { Item: { uuid: '1234', first_name: 'Test', email: 'test@example.com' } });
//       } else {
//         callback(null, {});
//       }
//     });

//     // Additional mocks for update, delete if necessary
//   });

//   afterAll(() => {
//     AWSMock.restore('DynamoDB.DocumentClient');
//   });

//   it('should return a successful response for creating a user', async () => {
//     const event = {
//       requestContext: {
//         resourcePath: '/users/create'
//       },
//       body: JSON.stringify({
//         "email":"testinguser2@gmail.com",
//         "password": "Admin@123",
//         "confirm_password": "Admin@123",
//         "first_name": "Testing",
//         "last_name": "User 2",
//         "gender": "MALE",
//         "mobile_no": "8976545768",
//         "date_of_birth": "2000-10-10"
//       })
//     };

//     const response = await handler(event);
    
//     expect(response.statusCode).toBe(200);
//     expect(JSON.parse(response.body)).toEqual({
//       status: 'success',
//       message: 'User added successfully'
//     });
//   });

//   it('should return user details for a valid UUID', async () => {
//     const event = {
//       requestContext: {
//         resourcePath: '/users/1234'
//       },
//       pathParameters: {
//         userId: '1234'
//       }
//     };

//     const response = await handler(event);

//     expect(response.statusCode).toBe(200);
//     expect(JSON.parse(response.body)).toEqual({
//       userId: '1234',
//       name: 'Test User',
//       email: 'test@example.com'
//     });
//   });

//   it('should return 404 for invalid resource path', async () => {
//     const event = {
//       requestContext: {
//         resourcePath: '/users/invalid'
//       }
//     };

//     const response = await handler(event);

//     expect(response.statusCode).toBe(404);
//     expect(JSON.parse(response.body)).toEqual({
//       status: 'error',
//       message: '404 not found'
//     });
//   });
// });

// const AWSMock = require('aws-sdk-mock');
// const { DynamoDB } = require('aws-sdk');
// const getUserByUuidService = require('../app/user/service/getUserDetailsByUuid.service'); // Import your getUserByUuidService

// describe('Get User By UUID Service', () => {
//   beforeAll(() => {
//     // Mock AWS DynamoDB DocumentClient
//     AWSMock.mock('DynamoDB.DocumentClient', 'get', (params:any, callback:any) => {
//       if (params.Key.uuid === '1234') {
//         callback(null, { Item: { uuid: '1234', first_name: 'Test', last_name: 'User', email: 'test@example.com' } });
//       } else {
//         callback(null, {});
//       }
//     });
//   });

//   afterAll(() => {
//     AWSMock.restore('DynamoDB.DocumentClient');
//   });

//   it('smaple hello',() =>{
//     console.log("Display Hello Message");
//   })

//   // it('should return user details for a valid UUID', async () => {
//   //   const container = {
//   //     input: {
//   //       query: { uuid: '1234' }
//   //     },
//   //     derived: {
//   //       logged_in_user: {} // Add any necessary derived data here
//   //     }
//   //   };

//   //   const response = await getUserByUuidService(container);

//   //   expect(response.output.result).toEqual({
//   //     uuid: '1234',
//   //     first_name: 'Test',
//   //     last_name: 'User',
//   //     email: 'test@example.com'
//   //   });
//   // });

//   // it('should throw an error for an invalid UUID', async () => {
//   //   const container = {
//   //     input: {
//   //       query: { uuid: 'invalid-uuid' }
//   //     },
//   //     derived: {
//   //       logged_in_user: {}
//   //     }
//   //   };

//   //   await expect(getUserByUuidService(container)).rejects.toThrow('User does not exist');
//   // });
// });
import AWSMock from 'aws-sdk-mock';
import AWS from 'aws-sdk';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { handler } from './userTestCrud';
import UserRepo  from '../app/user/repos/user.repo';
import userRepo from '../app/user/repos/user.repo';
import userController from '../app/user/controller/user.controller';

beforeAll(() => {
  AWSMock.setSDKInstance(AWS);
});

afterEach(() => {
  AWSMock.restore('DynamoDB.DocumentClient');
});

describe('User CRUD Lambda', () => {
  test('Create User', async () => {
    AWSMock.mock('DynamoDB.DocumentClient', 'put', Promise.resolve({
      status: "success",
      body: 'User created'
    }));


    // let payload = {
    //   body:{
        
    //   "email":"testinguser2@gmail.com",
    //   "password": "Admin@123",
    //   "confirm_password": "Admin@123",
    //   "first_name": "Testing",
    //   "last_name": "User 2",
    //   "gender": "MALE",
    //   "mobile_no": "8976545768",
    //   "date_of_birth": "2000-10-10"
    //   } 
    // }
    const event: Partial<APIGatewayProxyEvent> = {
      httpMethod: 'POST',
      body: JSON.stringify({ userId: '123', name: 'John Doe' })
    };
    const result = await handler(event as APIGatewayProxyEvent);
    // expect(result.status).toBe("success");
    expect(result.statusCode).toBe(200);
    expect(result.body).toEqual(JSON.stringify('User created'));
    // expect(result.body).toEqual(JSON.stringify('User created'));
  });

  // test('Read User', async () => {
  //   AWSMock.mock('DynamoDB.DocumentClient', 'get', Promise.resolve({
  //     Item: { uuid: '2257fcd1-ea09-4460-955c-8e1b03945b0c'}
  //   }));

  //   const event: Partial<APIGatewayProxyEvent> = {
  //     pathParameters: { uuid: '123' }
  //   };
  //   let uuid:any = '2257fcd1-ea09-4460-955c-8e1b03945b0c'
  //   const result:any = await userRepo.getUserByUUID(uuid);

  //   expect(result.status).toBe("success");
  //   // expect(result.body).toEqual(JSON.stringify({  }));
  // });

  // Similarly, add tests for Update and Delete operations
});