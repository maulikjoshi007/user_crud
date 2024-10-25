// Import Config
import config from '../../../config/constant';
import i18n from "../../../config/i18n";

// Import Static

// Import Middleware

// Import Controllers

// Import Helpers
import getErrors from '../../../helpers/vaildator.helper';
import ResponseHelper from '../../../helpers/response.helper';

// Import Transformers

// Import Libraries

// Import Models

// Import Thirdparty
import joi from 'joi';
const { joiPasswordExtendCore } = require('joi-password');
const joiPassword = joi.extend(joiPasswordExtendCore);

class UserValidator {

    /**
     * Validates the request body for adding a user.
     * 
     * @param {object} body - The request body containing user data.
     * @throws {Error} Throws an error if validation fails.
     * @returns {Promise<void>}
     */
   async addUser(body: any) {

        try {

            const rules = await joi.object().options({ abortEarly: false }).keys({
                email: joi.string().required(),
                password: joi.string()
                    .min(8)
                    .required()
                    .messages({
                        'string.min': `${i18n.__("validation.invalid_password")}`,
                    }),
                confirm_password: joi.any().valid(joi.ref('password')).required().messages({ 
                    "any.only": `${i18n.__("validation.not_match_password")}` 
                }),
                gender: joi.string().valid('MALE', 'FEMALE', 'OTHER').required(),
                mobile_no: joi.string().required(),
                date_of_birth:joi.date(),
                first_name: joi.string().required(),
                last_name: joi.string().required(),

            }).validate(body);

            const errors: any = await getErrors(rules);

            if (Object.keys(errors).length) {
                await ResponseHelper.getValidationError(errors);
            }

        } catch (error) {
            throw error;
        }

    }


    /**
     * Validates the request body for updating a user.
     * 
     * @param {object} body - The request body containing user data.
     * @throws {Error} Throws an error if validation fails.
     * @returns {Promise<void>}
     */
   async updateUser(body:any) {

    try {

        const rules = await joi.object().options({ abortEarly: false }).keys({
            user_uuid : joi.string().allow(null),
            email: joi.string().required(),
            gender: joi.string().valid('MALE','FEMALE','OTHER').required(),
            mobile_no: joi.string().required(),
            date_of_birth: joi.date(),
            first_name: joi.string().required(),
            last_name: joi.string().required()

        }).validate(body);

        const errors:any = await getErrors(rules);
        
        if (Object.keys(errors).length) {

            await ResponseHelper.getValidationError(errors);
        
        }

    } catch (error) {
        
        throw error;

    }

}

 /**
     * Validates the request body for retrieving user details by UUID.
     * 
     * @param {object} body - The request body containing UUID.
     * @throws {Error} Throws an error if validation fails.
     * @returns {Promise<void>}
     */
async getUserDetailsByUuid(body:any) {

    try {

        const rules = await joi.object().options({ abortEarly: false }).keys({
            uuid: joi.string().uuid().required()
        }).validate(body);

        const errors:any = await getErrors(rules);
        
        if (Object.keys(errors).length) {

            await ResponseHelper.getValidationError(errors);
        
        }

    } catch (error) {
        
        throw error;

    }

}

}

export default new UserValidator()