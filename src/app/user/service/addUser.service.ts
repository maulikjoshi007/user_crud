// Import config 
import config from "../../../config/constant";

// Import Interface

// Import validator
import userValidator from "../validator/user.validator";

//  Import Repo
import userRepo from "../repos/user.repo";

// Import Thirdparty 
import { StatusCodes } from 'http-status-codes';
import moment from 'moment-timezone';
import i18n from "../../../config/i18n";
import { v4 as uuidv4 } from 'uuid';
import path from "path";

/**
 * Service for simple sign up.
 * 
 * @param container - The container that holds input and derived data.
 * @returns The updated container after adding the user.
 * @throws Will throw an error if validation or user creation fails.
 */
const addUserService =async (container:any) => {

    try {
        const {
            input:{
                body
            } 
        }= container;

        //
        //  validate body
        //
        await userValidator.addUser(body);

        if(body.email.includes('+')){

            const err:any = new Error(i18n.__('auth.invalid_email'));
                err.statusCode = StatusCodes.BAD_REQUEST;
                throw err;

        }

        //
        // check duplicate user
        //
        const user = await userRepo.getUserByEmail(body.email);
        
        container.derived.user = user.Items
        
        //
        //  save user data
        //
        await saveUserData(container);


        //
        // send response
        //
        await sendResponse(container);


        return container;

    } catch (error) {
        
        throw error;

    }
    
}

/**
 * Saves user data to the database.
 * 
 * @param container - The container that holds input and derived data.
 * @returns The updated container after saving user data.
 * @throws Will throw an error if saving user data fails.
 */
const saveUserData =async (container:any) => {

    try {
        const {
            input:{
                body
            },
            derived: {
                user
            } 
        }= container;

        if(user && user.length > 0){

            const err:any = new Error(i18n.__('user.user_exist'));
            err.statusCode = 400;
            throw err;
        
        }

        //
        //  check mobile number exists or not
        //
        if(body.mobile_no && body.mobile_no != null){

            //
            //  get user by mobile number
            //
            const mobileNumber = await userRepo.getUserByMobileNumber(body.mobile_no);

            container.derived.userMobileDetails = mobileNumber.Items

            if(container.derived.userMobileDetails && container.derived.userMobileDetails.length > 0){

                const err:any = new Error(i18n.__('user.mobile_number_not_exists'));
                err.statusCode = StatusCodes.BAD_REQUEST;
                throw err;

            }

        }

        // Generate a random UUID
        container.derived.random_uuid = uuidv4();

        //
        //  user data model
        //
        const userDataModel:any = {
            uuid: container.derived.random_uuid,
            email: body.email,
            password: body.password,
            first_name: body.first_name,
            last_name: body.last_name,
            gender: body.gender,
            status: 'ACTIVE',
            date_of_birth: body.date_of_birth,
            mobile_no: body.mobile_no,
            search_name: body.first_name.toLowerCase() + ' ' + body.last_name.toLowerCase(),
            created_at: moment.utc().format('YYYY-MM-DD HH:mm:ss')
        };

        //
        //  save user data
        //
        await userRepo.saveUserData(userDataModel);

        const savedUserData = await userRepo.getUserByUUID(container.derived.random_uuid)

        container.derived.user = savedUserData.Item

        return container;

    } catch (error) {
        
        throw error;

    }
    
}


/**
 * Sends a response after user data has been processed.
 * 
 * @param container - The container that holds input and derived data.
 * @throws Will throw an error if sending response fails.
 */
const sendResponse =async (container:any) => {

    try {
        const {
            input:{
                body
            },
            derived: {
                user
            } 
        }= container;
        

        delete user.password

        //
        //  send the result 
        //
        container.output.result.user = user; 

    } catch (error) {
        
        throw error;

    }
    
}


export default addUserService;

