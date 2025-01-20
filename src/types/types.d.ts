import NextAuth from "next-auth";
import { Document } from "mongoose";
import { User } from "@/models/user.model";

declare module 'next-auth' {
    interface Profile{
        _id?:String,
        id?:String,
        name?:String,
        url?:String,
        sub?:String,
        email?:String,
        image?:String,
    }
}