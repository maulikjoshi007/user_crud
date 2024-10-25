// // Import config
// import config from '../config/constant';
// import dynamoDB from '../config/dynamo'

// const getDAMData = async (clientId : any) => {

//     try {

//         console.log("inside get DAM DATA");
        

//         //   const params_1 = {
//         //     TableName: config.tables.USER,
//         //     KeyConditionExpression: "#first_name = :first_name_value",
//         //     ExpressionAttributeNames: {
//         //         "#first_name": "first_name"
//         //     },
//         //     ExpressionAttributeValues: {
//         //         ":first_name_value": "yash"
//         //     }
//         //   };

//         const scanParams = {
//             TableName: config.tables.USER,
//             FilterExpression: "first_name = :name",
//             ExpressionAttributeValues: {
//               ":name": "Bhavya",
//             },
//           };

//           const data_1 = await dynamoDB.scan(scanParams).promise();
          
//           console.log("----------------------");
//           console.log(data_1);
//           console.log("----------------------");

//         // const damData = await dynamoDB.get({
//         //         TableName: "user",
//         //         Key: {
//         //             uuid : parseInt(clientId)
//         //         }
//         //     }).promise();
//         // console.log(damData);

//         // return damData['Item'];

//     } catch (error : any) {

//         throw error

//     }
// }

// export { getDAMData }