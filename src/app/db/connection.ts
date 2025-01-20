import mongoose from "mongoose";
import { createModels } from "@/models/createModels";

export const connect = async () => {
    try {
        console.log('Connect Database Successfully')
        await mongoose.connect(process.env.DATABASE_URL!).then(() => {
            createModels()
            console.log('All Models Created');
        })
    } catch (error) {
        console.log("Unable to Connect with mongodb")
    }
}