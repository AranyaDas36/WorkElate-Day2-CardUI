import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbConnect = async () =>{
    
        await mongoose.connect(process.env.MONGO_URI).then(() => {
            console.log("Connected to MongoDB");
        }).catch((error) => {
            console.log(error);
        });
    
}

export default dbConnect;