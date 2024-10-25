// Import Config
import config from '../../../config/constant';
import dynamoDB from '../../../config/dynamo'

// Import Services

// Import Middleware

// Import Controllers

// Import Interface
import GUID from '../../../interface/GUIDInterface';

// Import Validators

// Import Helpers

// Import Repos

// Import Transformers

// Import Libraries

// Import Models

// Import Thirdparty

class UserRepo {

    /**
     * Inserts user details into the database.
     * 
     * @param details - The details of the user to be inserted
     * @returns A promise that resolves when the user is successfully inserted
     */
    async insertUserDetails(details: any) {

        try {

            const params = {
                TableName: config.tables.USER,
                Item: {
                    ...details
                }
            }

            await dynamoDB.put(params).promise();

        } catch (error) {

            throw error

        }

    }

   /**
     * Retrieves a user by their UUID.
     * 
     * @param uuid - The UUID of the user to retrieve
     * @returns A promise that resolves to the user details
     */
    async getUserByUUID(uuid: GUID) {

        try {

            const params = {
                TableName: config.tables.USER,
                Key: {
                    uuid: uuid,
                },
            };

            return await dynamoDB.get(params).promise();

        } catch (error) {

            throw error

        }

    }

     /**
     * Retrieves a user by their email address.
     * 
     * @param email - The email of the user to retrieve
     * @returns A promise that resolves to the user details
     */
    async getUserByEmail(email: string) {

        try {

            const scanParams = {
                TableName: config.tables.USER,
                FilterExpression: "email = :email_value",
                ExpressionAttributeValues: {
                    ":email_value": email,
                },
            };

            const user = await dynamoDB.scan(scanParams).promise();

            return user

        } catch (error) {

            throw error

        }

    }


    /**
     * Saves user data to the database.
     * 
     * @param data - The user data to be saved
     * @returns A promise that resolves when the user data is successfully saved
     */
    async saveUserData(data: any) {

        try {

            console.log("details");
            console.log(data);

            const params = {
                TableName: config.tables.USER,
                Item: {
                    ...data
                }
            }

            await dynamoDB.put(params).promise();

        } catch (error) {

            throw error

        }

    }


  /**
     * Updates user details in the database.
     * 
     * @param key - The key identifying the user to update
     * @param dataModel - The data to update for the user
     * @returns A promise that resolves to the updated user details
     */
    async updateUserDetails(key: any, dataModel: any) {

        try {

            // Construct the update expression and attribute values
            const updateKeys = Object.keys(dataModel);
            const updateExpression = 'set ' + updateKeys.map((key, index) => `${key} = :value${index}`).join(', ');
            const expressionAttributeValues = updateKeys.reduce((acc: any, key: any, index: any) => {
                acc[`:value${index}`] = dataModel[key];
                return acc;
            }, {});

            const params = {
                TableName: config.tables.USER,
                Key: key,
                UpdateExpression: updateExpression,
                ExpressionAttributeValues: expressionAttributeValues,
                ReturnValues: "UPDATED_NEW"
            };

            const result = await dynamoDB.update(params).promise();

            return result.Attributes;

        } catch (error) {

            throw error

        }

    }

     /**
     * Deletes a user by UUID from the database.
     * 
     * @param uuid - The UUID of the user to delete
     * @returns A promise that resolves when the user is successfully deleted
     */
    async deleteUser(uuid: any) {

        try {

            const params = {
                TableName: config.tables.USER,
                Key: {
                    'uuid': uuid
                }
            };
    
            await dynamoDB.delete(params).promise();
            
        } catch (error) {

            throw error;

        }

    }


   /**
     * Retrieves a user by their mobile number.
     * 
     * @param mobileNo - The mobile number of the user to retrieve
     * @returns A promise that resolves to the user details
     */
    async getUserByMobileNumber(mobileNo: any) {

        try {

            const scanParams = {
                TableName: config.tables.USER,
                FilterExpression: "mobile_no = :mobile_no_value",
                ExpressionAttributeValues: {
                    ":mobile_no_value": mobileNo,
                },
            };

            const user = await dynamoDB.scan(scanParams).promise();

            return user

        } catch (error) {

            throw error

        }

    }

}

export default new UserRepo()