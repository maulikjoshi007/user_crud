'use strict'; 
// Import Config
import i18n from '../../../config/i18n';
import config from '../../../config/constant';

// Import Static

// Import Middleware

// Import Controllers

// Import Interface

// Import Helpers

// Import validations
import userValidator from '../validator/user.validator';

// Import Transformers

// Import Libraries

// Import Thirdparty
import moment from 'moment-timezone';
import userRepo from '../repos/user.repo';
import { StatusCodes } from 'http-status-codes';

/**
 * Service to retrieve user details by UUID.
 * 
 * @param container - The container that holds input and derived data.
 * @returns The updated container with user details in the output.
 * @throws Will throw an error if user does not exist or if validation fails.
 */
const getUserByUuidService = async (container: any) => { 

    try {

        const {
            input: {
                params,
                query,
                body
            },
            derived: {
                logged_in_user
            }

        } = container;

        //
        //  validate body
        //
        await userValidator.getUserDetailsByUuid(query);

        //
        //  check user exists or not
        //
        const user = await userRepo.getUserByUUID(query.uuid);

        if(!user.Item){

            const err:any = new Error(i18n.__('user.no_user_exist'));
                err.statusCode = StatusCodes.BAD_REQUEST;
                throw err;

        }

       
        delete user.Item.password

        container.output.result = user.Item

        
        return container;

    } catch (error) {

        throw error;

    }
}

export default getUserByUuidService;