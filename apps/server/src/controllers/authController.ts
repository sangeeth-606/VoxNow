import {  Request,Response } from "express";
import { supabase } from "../config/supabase";

export const signUp = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;
        const { data, error } = await supabase.auth.signUp({ email, password });

        if (error) throw error;
        res.status(201).json({ message: "User Registered", user: data.user });

    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export const Login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) throw error;
        res.status(200).json({ message: "Login successful", data });

    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
    try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        res.status(200).json({ message: "Logout successful" });

    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};
