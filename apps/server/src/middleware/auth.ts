import  { Request,Response,NextFunction } from "express";
import { supabase } from "../config/supabase";
import { User } from "@supabase/supabase-js"; // Import User type from Supabase

declare global {
  namespace Express {
    interface Request {
      user?: User; // Attach Supabase user type
    }
  }
}

export const authenticateUser = async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const token= req.headers.authorization?.split(" ")[1];
        
        if(!token){
            res.status(401).json({message:"Unauthorized: No token provided"})

        }
        const {data,error}= await supabase.auth.getUser(token);

        if (error || !data?.user) {
            return res.status(401).json({ message: "Unauthorized: Invalid token" });
        }

        req.user=data.user;
        next();

    }catch(error){
        res.status(500).json({ message: "Internal Server Error", error });
    }
}