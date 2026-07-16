import { registerUser, verifyEmailService } from "../services/auth.service.js";
import { registerSchema } from "../validations/auth.validation.js";

export const register = async (req, res) =>{

    try{

        const validatedData = registerSchema.parse(req.body);

        const response = await registerUser(validatedData);
        
        res.status(201).json(response);

    }catch(error) {
        return res.status(400).json({
            success: false,
            message: error.error?.[0]?.message || error.message
        });
    }
};

export const verifyEmail = async ( req, res ) => {
 
    try{

        const { token } = req.body;

        const response = await verifyEmailService(token);

        return res.status(200).json(response);

    }catch(error){
        return res.status(400).json({
            success: false,
            message: error.message,
        })
    }
}