import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
        },

        profileImage: {
            type: String,
            default: "",
        },

        isEmailVerified: {
            type: Boolean,
            default: false,
        },

        emailVerificationToken: {
            type: String
        },

        emailVerificationExpires: {
            type: Date
        },

        refreshToken: {
            type: String,
            default: null,
        },

        refreshTokenExpires: {
            type: Date,
            default: null,
        },
        
        authProvider: {
            type: String,
            enum: ["local", "google"],
            default: "local",
        },

        accountStatus: {
            type: String,
            enum: ["active", "suspended", "deleted"],
            default: "active",
        },

    },
        {
            timestamps: true
        }
);


const User = mongoose.model("User", userSchema);

export default User;