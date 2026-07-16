import mangoose from "mongoose";

const userSchema = new mangoose.Schema(
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

userSchema.index({email:1});

const user = mangoose.model("User", userSchema);

export default user;