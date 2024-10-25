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
 * Service to update user information.
 * 
 * @param container - The container that holds input and derived data.
 * @returns The updated container after user information is modified.
 * @throws Will throw an error if user does not exist or if validation fails.
 */
const updateUserService = async (container: any) => { 

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
        await userValidator.updateUser(body);

        //
        //  check user exists or not
        //
        const user = await userRepo.getUserByUUID(body.user_uuid);

        if(!user.Item){

            const err:any = new Error(i18n.__('user.no_user_exist'));
                err.statusCode = StatusCodes.BAD_REQUEST;
                throw err;

        }
        
        //
        //  update user profile
        //
        await updateUserProfile(container)
        
        return container;

    } catch (error) {

        throw error;

    }
}

/**
 * Helper function to update the user's profile.
 * 
 * @param container - The container that holds input and derived data.
 * @returns The updated container with a success message.
 * @throws Will throw an error if update fails.
 */
const updateUserProfile = async (container: any) => { 

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
        //  prepare data model to update user
        //
        const updateUserDataModel = {
            email: body.email,
            first_name: body.first_name,
            last_name: body.last_name,
            date_of_birth: body.date_of_birth,
            mobile_no: body.mobile_no,
            gender: body.gender,
            search_name: body.first_name.toLowerCase() + ' ' + body.last_name.toLowerCase(),
            updated_at: moment.utc().format("YYYY-MM-DD HH:mm:ss")
        }

        //
        //  prepare key to update the data
        //
        const key = {
            uuid : body.user_uuid
        }

        //
        //  update user profile
        //
        const updatedDetails = await userRepo.updateUserDetails(key,updateUserDataModel);

        container.output.message = i18n.__('user.user_profile_update_success');
        
        return container;

    } catch (error) {

        throw error;

    }
}

export default updateUserService;