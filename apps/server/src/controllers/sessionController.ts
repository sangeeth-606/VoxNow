//this code is ERROR ()=> coz of (Implicit Typing)

// import { Request, Response } from "express"; // Make sure you import these
// import { supabase } from "../config/supabase";
// import { RequestHandler } from "express";

// export const createSession = async (req: Request, res: Response) => {
//   try {
//     const { name, description } = req.body;
//     const userId = (req as any).user.id;

//     const { data, error } = await supabase
//       .from("sessions")
//       .insert([{ name, description, owner_id: userId }])
//       .select()
//       .single();

//     if (error) {
//       console.error("Supabase error:", error); // Log the error!
//       return res.status(500).json({ error: error.message }); // Return on error
//     }

//     res.status(201).json({ message: "session created", session: data }); // No return here!!!
    
//   } catch (error: any) {
//     console.error("Error creating session:", error); // Log the error!
//     res.status(500).json({ error: error.message }); // No return here!!!
//   }
// };
import { Request, Response, NextFunction, RequestHandler } from "express";
import { supabase } from "../config/supabase";

// export const createSession = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): Promise<void> => {  // ✅ Ensure function explicitly returns Promise<void>
//   try {
//     const { name, description } = req.body;
//     const userId = (req as any).user.id;

//     const { data, error } = await supabase
//       .from("sessions")
//       .insert([{ name, description, owner_id: userId }])
//       .select()
//       .single();

//     if (error) {
//       console.error("Supabase error:", error);
//       res.status(500).json({ error: error.message }); // ✅ No return statement here
//       return; // ✅ Ensure the function returns void
//     }

//     res.status(201).json({ message: "session created", session: data }); // ✅ No return statement
//   } catch (error: any) {
//     console.error("Error creating session:", error);
//     res.status(500).json({ error: error.message }); // ✅ No return statement
//   }
// };
export const createSession = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, description } = req.body;
    const userId = (req as any).user?.id; // ✅ Add ? to avoid crashes

    console.log("Creating session with:", { name, description, userId });

    if (!userId) {
      console.error("Error: No user ID found in request.");
      res.status(401).json({ error: "Unauthorized: User ID missing" });
      return;
    }

    const { data, error } = await supabase
      .from("sessions")
      .insert([{ name, description, owner_id: userId }])
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      res.status(500).json({ error: error.message });
      return;
    }

    console.log("Session created:", data);
    res.status(201).json({ message: "Session created", session: data });

  } catch (error: any) {
    console.error("Error creating session:", error);
    res.status(500).json({ error: error.message });
  }
};


export const getUserSessions = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.id;

    const { data, error } = await supabase
      .from("sessions")
      .select()
      .eq("owner_id", userId);

    if (error) {
      console.error("Supabase error:", error);
      res.status(500).json({ error: error.message });
      return; // Return on error
    }

    res.status(200).json({ session: data }); // No return here!!!

  } catch (error: any) {
    console.error("Error getting user sessions:", error);
    res.status(500).json({ error: error.message }); // No return here!!!
  }
};

export const getSessionById = async (req: Request, res: Response):Promise<void> => {
  try {
    const { id } = req.params;  // Change from session_id to id


    const { data, error } = await supabase
      .from("sessions")
      .select("*")
      .eq("id", id) 
      .single();

    if (error) {
       console.error("Supabase error:", error);
       res.status(500).json({ error: error.message }); 
       return;// Return on error
    }

    res.status(200).json({ session: data }); // No return here!!!

  } catch (error: any) {
    console.error("Error getting session by ID:", error);
    res.status(500).json({ error: error.message }); // No return here!!!
  }
};