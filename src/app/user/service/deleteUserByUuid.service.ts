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

// Import Transformers

// Import Libraries

// Import Thirdparty
import userRepo from '../repos/user.repo';

/**
 * Service to delete a user by UUID.
 * 
 * @param container - The container that holds input and derived data.
 * @returns The updated container with a success message.
 * @throws Will throw an error if the deletion process fails.
 */
const deleteUserByUuid = async (container: any) => { 

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

        console.log("Query",query);
        const getUserByUuid:any = await userRepo.getUserByUUID(query.uuid); 

        console.log("Get User",getUserByUuid);

        await userRepo.deleteUser(query.uuid);

        container.output.message = i18n.__('user.delete_success');
        
        return container;

    } catch (error) {

        throw error;

    }
}

export default deleteUserByUuid;