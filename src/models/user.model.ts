import mongoose, { InferSchemaType } from "mongoose";
import { Genders, GENDERS } from "../lib/genders";

const UserSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    userName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: null,  // or a placeholder image URL
    },
    online: {
        type: Boolean,
        default: false,
    },
    gender: {
        type: String,
        enum: GENDERS,
        default: Genders.PREFER_NOT_TO_SAY,
    },
}, {
    collection: 'users',
    timestamps: true,
});

const UserModel = mongoose.model('User', UserSchema);

export type UserDoc = InferSchemaType<typeof UserSchema>;

export default UserModel;