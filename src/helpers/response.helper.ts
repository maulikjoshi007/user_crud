// Import Config
import i18n from '../config/i18n';

// Import Services

// Import Middleware

// Import Controllers

// Import Interface

// Import Validators

// Import Helpers

// Import Repos

// Import Transformers

// Import Libraries
 
// Import Models

// Import Thirdparty
import statusCodes from 'http-status-codes';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

class ResponseHelper {
    
    /**
     * Formats a successful response.
     * 
     * @param {object} data - The response data containing message, result, and optional meta information.
     * @returns {Promise<object>} The formatted success response.
     */
    async successResponse (data:any)  {

        let responseFormat : any = {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Headers" : "Content-Type",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PATCH,DELETE,PUT",
                "Content-Type": "application/json"
            },
            body:  JSON.stringify({
                status: "success",
                message: data.message,
                data : data.result,
                meta : data.meta
            })
        };

        return responseFormat

    }

    /**
     * Formats a validation error response.
     * 
     * @param {object} error - The error object containing status code and message.
     * @returns {Promise<object>} The formatted validation error response.
     */
    async validationErrorResponse(error : any) {

        let responseFormat : any = {
            statusCode: isNaN(error.statusCode) ? 500 : error.statusCode,
            headers: {
                "Access-Control-Allow-Headers" : "Content-Type",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PATCH,DELETE,PUT",
                "Content-Type": "application/json"
            },
            body:  JSON.stringify({
                message: error.message
            })
        };

        return responseFormat

    }

   /**
     * Retrieves the status code from the error object.
     * 
     * @param {object} error - The error object containing a status code.
     * @returns {number} The status code, defaulting to 500 if not a number.
     */
    async getStatusCode(error:any) {

        return isNaN(error.statusCode) ? 500 : error.statusCode;

    }
    
    /**
     * Formats and throws a validation error.
     * 
     * @param {object} errors - The validation errors to format.
     * @throws Will throw an error containing the validation errors and a status code of 400.
     */
    async getValidationError(errors:any) {

        try {

            const errFormat:any = new Error(i18n.__('validation_error'));
            errFormat.validationErrors = errors;
            errFormat.statusCode = statusCodes.BAD_REQUEST
            throw errFormat;

        } catch (err) {

            throw err;

        }

    }
}

export default new ResponseHelper()
