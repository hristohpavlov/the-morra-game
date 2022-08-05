import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"]
    },
    email: {
        type: String,
        required: [true, "Please provide a email"],
        unique: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide a valid email"
        ]
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        minlength: 4,
        select: false,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
});

//Mongoose middleware for presavign and postsaving passwords
UserSchema.pre("save", async function(next) {
    if(!this.isModified("password")) {
        next();
    }

    const salt =  await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

UserSchema.methods.matchPasswords = async function (password){
    return await bcrypt.compare(password, this.password)
}

export const User = mongoose.model("User", UserSchema);