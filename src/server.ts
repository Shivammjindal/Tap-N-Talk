// import mongoose from "mongoose"
// import { createModels } from "./models/createModels"

// console.log("Server Ts is Running")

// export const connect = async () => {
//     try {
//         console.log('Connect Database Successfully')
//         await mongoose.connect(process.env.DATABASE_URL!)
//     } catch (error) {
//         console.log("Unable to Connect with mongodb")
//     }
// }
// connect().then(() => {
//     createModels()
//     console.log('All Models Created');
// })