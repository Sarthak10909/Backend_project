import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDb = async() =>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MongoDB connected!!  DB HOST: ${connectionInstance.connection.host}`)
        
    } catch (error) {
        console.log("MongoDB connection error: ", error)
        
    }
}

export default connectDb
