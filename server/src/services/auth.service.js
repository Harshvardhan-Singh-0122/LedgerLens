import User from "../models/user.model.js";
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { sendVerificationEmail } from "./mail.service.js";

export const registerUser = async (userData) => {

    if (user.accountStatus !== "active") {
        throw new Error("Account is not active.");
    }
    
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

    user.updatedAt = new Date();

    await user.save();

    return {
        success: true,
        message: "Email verified successfully.."
    }
}
