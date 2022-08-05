import mongoose from "mongoose";

const connectToDB = async() => {
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    console.log("MongoDB connected");
}

export default connectToDB