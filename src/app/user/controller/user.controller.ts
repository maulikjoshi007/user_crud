// Import Config

// Import Services
import addUserervice from '../service/addUser.service';
import updateUserervice from '../service/updateUser.service';
import getUserByUuidService from '../service/getUserDetailsByUuid.service';
import deleteUserByUuidService from '../service/deleteUserByUuid.service';

// Import Middleware

// Import Controllers

// Import Interface

// Import Validators

// Import Helpers
import responseHelper from '../../../helpers/response.helper';

// Import Repos

// Import Transformers

// Import Libraries
 
// Import Models
    
class UserController {

    /**
     * Adds a new user to the system.
     * 
     * @param event - The incoming request event containing user data
     * @returns A success response object containing the added user details
     */
    async addUser(event:any) {

        try {
            console.log("In Add User",event)
            const container: any = {
                input: {
                    body: JSON.parse(event.body)
                },
                derived: {},
                output: {
                    result: {}
                }
            };
            console.log("event",event,container);
            //
            //  add User service 
            //
            await addUserervice(container);

            //
            //  send the response
            //
            return await responseHelper.successResponse(container.output)

        } catch (error: any) {

            return await responseHelper.validationErrorResponse(error)

        }
    }

   /**
     * Updates existing user data in the system.
     * 
     * @param event - The incoming request event with user data to update
     * @returns A success response object with the updated user details
     */
    async updateUser(event:any) {

        try {

            const container: any = {
                input: {
                    body: JSON.parse(event.body)
                },
                derived: {},
                output: {
                    result: {}
                }
            };

            
            //
            //  update User service 
            //
            await updateUserervice(container);

            //
            //  send the response
            //
            return await responseHelper.successResponse(container.output)

        } catch (error: any) {

            return await responseHelper.validationErrorResponse(error)

        }
    }

    /**
     * Retrieves user details by UUID.
     * 
     * @param event - The incoming request event containing the UUID of the user
     * @returns A success response object with the user details
     */
    async getUserDetailsByUuid(event:any) {

        try {

            const container: any = {
                input: {
                    body: JSON.parse(event.body),
                    query: event.queryStringParameters
                },
                derived: {},
                output: {
                    result: {}
                }
            };

            //
            //  get User by uuid service 
            //
            await getUserByUuidService(container);

            //
            //  send the response
            //
            return await responseHelper.successResponse(container.output)

        } catch (error: any) {

            return await responseHelper.validationErrorResponse(error)

        }
    }

     /**
     * Deletes a user by UUID from the system.
     * 
     * @param event - The incoming request event containing the UUID of the user
     * @returns A success response object indicating the deletion status
     */

    async deleteUserByUuid(event:any) {

        try {

            const container: any = {
                input: {
                    body: JSON.parse(event.body),
                    query: event.queryStringParameters
                },
                derived: {},
                output: {
                    result: {}
                }
            };

            
            //
            //  delete User by user uuid service 
            //
            await deleteUserByUuidService(container);

            //
            //  send the response
            //
            return await responseHelper.successResponse(container.output)

        } catch (error: any) {

            return await responseHelper.validationErrorResponse(error)

        }
    }

}
export default new UserController();