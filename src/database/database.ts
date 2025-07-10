import mongoose from "mongoose";

export const connectDb = async (uri: string, cb?: () => void) => {
    try {
        await mongoose.connect(uri);
        if (cb) cb();
    } catch (error) {
        throw error;
    }
}