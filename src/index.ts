import 'dotenv/config';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
// import { getDAMData } from './AWS/dynamo';
import { parseQueryString } from './helpers/query.helper';
import e, { NextFunction, Response } from 'express';

//  Import Controllers
import userController from './app/user/controller/user.controller';


export const handler = async (event:any): Promise<any> => {

    try {

        console.log("event index js");
        console.log(event);
        
        switch(event.requestContext.resourcePath) {
            case '/users/create':
                const add = await userController.addUser(event);
                return add
                break;

            case '/users/update':
                const updateUser = await userController.updateUser(event);
                return updateUser
                break;

            case '/users/uuid':
                const userDetailsByUuid = await userController.getUserDetailsByUuid(event);
                return userDetailsByUuid
                break;

            case '/users/delete':
                const deleteUserByUuid = await userController.deleteUserByUuid(event);
                return deleteUserByUuid
                break;
            
            default:
                return {
                    status:'error',
                    message: '404 not found'
                }

        }

        
    } catch (error) {

        throw error
        
    }
};




