import dotenv from 'dotenv';
dotenv.config()
import path from 'path'

export default {
    app: {
        ENVIRONMENT: process.env.NODE_ENV,
        AUTH_KEY: process.env.AUTH_KEY,
        AWS_REGION: process.env.AWS_REGION,
        AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY,
        AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY
    },
    tables: {
        USER:'ms_user'
    }
};
