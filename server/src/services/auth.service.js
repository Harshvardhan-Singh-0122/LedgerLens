import User from "../models/user.model.js";
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { sendVerificationEmail } from "./mail.service.js";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken} from "../utils/jwt.js";

export const registerUser = async (userData) => {
    
    const { email} = userData;

    const existingUser = await User.findOne({ email });

    if (existingUser) {

        if (existingUser.isEmailVerified) {
            throw new Error("User with this email already exists");
        }

        const verificationToken = crypto.randomBytes(32).toString("hex");

        const hashedVerificationToken = crypto
            .createHash("sha256")
            .update(verificationToken)
            .digest("hex");

        const verificationExpires = new Date(
            Date.now() + 24 * 60 * 60 * 1000
        );

        existingUser.password = await bcrypt.hash(userData.password, 10);

        existingUser.emailVerificationToken = hashedVerificationToken;

        existingUser.emailVerificationExpires = verificationExpires;

        await existingUser.save();

        const verificationLink =
        `${process.env.CLIENT_URL}/verify-email?token=${verificationToken}`;

        await sendVerificationEmail(
            existingUser.email,
            existingUser.fullName,
            verificationLink
        );

        return {
            success: true,
            message: "Your email is not verified. A new verification link has been sent to your email."
        };

    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

//-----------For EMAIL VERIFICATION TOKEN GENERATION AND HASH WITH SHA256 ALgo--------------

    const verificationToken = crypto.randomBytes(32).toString("hex");

    const hashedVerificationToken = crypto
        .createHash("sha256")
        .update(verificationToken)
        .digest("hex");

//----------------FOR TOKEN EXPIRY--------------------------------
    const verificationExpires = new Date(
        Date.now() + 24 * 60 * 60 * 1000
    );

    const user = await User.create({
        ...userData,
        password: hashedPassword,

        emailVerificationToken: hashedVerificationToken,
        emailVerificationExpires: verificationExpires,
    });

//------------------VERIFICATION LINK FOR SEND EMAMIL FUCNTION
    const verificationLink = `${process.env.CLIENT_URL}/verify-email?token=${verificationToken}`;

    await sendVerificationEmail(
        user.email,
        user.fullName,
        verificationLink
    );


    return{
        success: true,
        message: "User registered successfully",
        data:{
            id: user._id,
            fullName: user.fullName,
            email: user.email
        }
    };
};

export const verifyEmailService = async (token) => {

    const hashedToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");


    const user = await User.findOne({
        emailVerificationToken: hashedToken,
    });

//--------------------IF THE TOKEN IS INVALID__
    if(!user){
        throw new Error("Invalid Verification token..");
    }

//----------------------THIS PREVENTS IS EMAIL IS ALREADY VERIFIED
    if(user.isEmailVerified){
        throw new Error("Email is already verified");
    }

//-----------THIS IS IF LINK EXPIRED
    if (
        !user.emailVerificationExpires ||
        user.emailVerificationExpires < new Date()
    ) {
        throw new Error("Verification link has expired.");
    }

    user.isEmailVerified = true;

    user.emailVerificationToken = null;
    user.emailVerificationExpires = null;


    await user.save();

    return {
        success: true,
        message: "Email verified successfully.."
    }
}


//----------------USED TO GENERATE THE ACCESS TOKECN AND REFRESH TOKEN AND HASH IT__--__--
const generateAuthTokens = async (user) => {

    // Generate Tokens
    const accessToken = generateAccessToken(user._id);

    const refreshToken = generateRefreshToken(user._id);

    // Hash Refresh Token
    const hashedRefreshToken = crypto
        .createHash("sha256")
        .update(refreshToken)
        .digest("hex");

    // Save Refresh Token
    user.refreshToken = hashedRefreshToken;

    user.refreshTokenExpires = new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000
    );

    await user.save();

    return {
        accessToken,
        refreshToken,
    };

};


export const loginUser = async (userData) =>{
    const { email, password } = userData;

    const user = await User.findOne({ email });

    if(!user){
        throw new Error("Invalid email or password.");
    }

    if(!user.isEmailVerified){
        throw new Error("Email is not verified. Please verify your email before logging in.");
    }

    if(user.accountStatus !== "active"){
        throw new Error("Account is not active.");
    }

    const isPasswordMatched = await bcrypt.compare(
        password,
        user.password
    );

    if (!isPasswordMatched) {
        throw new Error("Invalid email or password");
    }
    const { accessToken, refreshToken } = await generateAuthTokens(user);

    return {
        success: true,
        message: "Login successful",

        accessToken,
        refreshToken,

        data: {
            id: user._id,
            fullName: user.fullName,
            email: user.email,
            profileImage: user.profileImage,
        },
    }
}



export const getProfileService = async (userId) => {

    const user = await User.findById(userId)
        .select(
            "-password -refreshToken -refreshTokenExpires -emailVerificationToken -emailVerificationExpires"
        );

    if (!user) {
        throw new Error("User not found.");
    }

    return {
        success: true,
        data: user,
    };

};


export const refreshTokenService = async (refreshToken) => {

    // -------------------- Verify Refresh Token --------------------

    let decoded;

    try {
        decoded = verifyRefreshToken(refreshToken);
    } catch {
        throw new Error("Invalid or expired refresh token.");
    }

    // -------------------- Find User --------------------

    const user = await User.findById(decoded.userId);

    if (!user) {
        throw new Error("User not found.");
    }

    // -------------------- Account Status --------------------

    if (user.accountStatus !== "active") {
        throw new Error("Account is not active.");
    }

    // -------------------- Database Expiry Check --------------------

    if (
        !user.refreshTokenExpires ||
        user.refreshTokenExpires < new Date()
    ) {
        throw new Error("Refresh token has expired.");
    }

    // -------------------- Hash Incoming Refresh Token --------------------

    const hashedRefreshToken = crypto
        .createHash("sha256")
        .update(refreshToken)
        .digest("hex");

    // -------------------- Compare Refresh Token --------------------

    if (hashedRefreshToken !== user.refreshToken) {
        throw new Error("Invalid refresh token.");
    }

    // -------------------- Generate New Tokens --------------------

    const {
        accessToken,
        refreshToken: newRefreshToken,
    } = await generateAuthTokens(user);

    return {
        success: true,
        message: "Access token refreshed successfully.",

        accessToken,
        refreshToken: newRefreshToken,
    };

};


//--------------------FOR LOGOUT------------

export const logoutService = async (userId) => {

    const user = await User.findById(userId);

    if (!user) {
        throw new Error("User not found.");
    }

    user.refreshToken = null;
    user.refreshTokenExpires = null;

    await user.save();

    return {
        success: true,
        message: "Logged out successfully.",
    };

};