import { Request,Response } from "express";
import { supabase } from "../config/supabase";

//create voting session 
export const createSession = async(req:Request,res:Response)=>{
    try{
        const {name,description}=req.body;
        const userId=(req as any).user.id;

        const {data , error }= await supabase
        .from("sessions")
        .insert([{name,description,owner_id:userId}])
        .select()
        .single()

        if (error) throw error;
        return res.status(201).json({message:"session created",sessio:data});

    }catch(error:any){
        return res.status(500).json({error:error.message});

    }
}