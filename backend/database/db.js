import mongoose from "mongoose";

const connectDb = async() => {{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("MongoDB connection successful");
    }catch(error){
        console.log("Mongodb Connection Error", error);
    }
}}

export default connectDb;