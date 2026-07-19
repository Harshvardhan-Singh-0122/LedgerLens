import { registerUser, verifyEmailService, loginUser, getProfileService, refreshTokenService, logoutService} from "../services/auth.service.js";
import { registerSchema, loginSchema } from "../validations/auth.validation.js";
import { refreshCookieOptions } from "../config/cookie.js";

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

        const { token } = req.query;

        const response = await verifyEmailService(token);

        return res.status(200).json(response);

    }catch(error){
        return res.status(400).json({
            success: false,
            message: error.message,
        })
    }
}

export const login = async (req, res) => {
    try {

        const validatedData = loginSchema.parse(req.body);

        const response = await loginUser(validatedData);

        // Set Refresh Token in HTTP-only Cookie
        res.cookie("refreshToken", response.refreshToken, refreshCookieOptions);

        delete response.refreshToken;

        return res.status(200).json(response);

    } catch (error) {

        return res.status(400).json({
            success: false,
            message: error.error?.[0]?.message || error.message,
        });

    }
};


export const getProfile = async (req, res) => {

    try {

        const response = await getProfileService(req.user._id);

        return res.status(200).json(response);

    } catch (error) {

        return res.status(400).json({
            success: false,
            message: error.message,
        });

    }

};


export const refreshToken = async (req, res) => {

    try {

        const token = req.cookies.refreshToken;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Refresh token is required.",
            });
        }

        const response = await refreshTokenService(token);

        res.cookie("refreshToken", response.refreshToken, refreshCookieOptions);

        delete response.refreshToken;

        return res.status(200).json(response);

    } catch (error) {

        return res.status(401).json({
            success: false,
            message: error.message,
        });

    }

};


export const logout = async (req, res) => {

    try {

        const response = await logoutService(req.user._id);

        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });

        return res.status(200).json(response);

    } catch (error) {

        return res.status(400).json({
            success: false,
            message: error.message,
        });

    }

};