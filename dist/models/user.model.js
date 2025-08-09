"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const genders_1 = require("../lib/genders");
const UserSchema = new mongoose_1.default.Schema({
    uid: {
        type: String,
        required: true,
        unique: true,
    },
    teudatZehut: {
        type: Number,
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
        default: null, // or a placeholder image URL
    },
    online: {
        type: Boolean,
        default: false,
    },
    gender: {
        type: String,
        enum: genders_1.GENDERS,
        default: genders_1.Genders.PREFER_NOT_TO_SAY,
    },
}, {
    collection: 'users',
    timestamps: true,
});
const UserModel = mongoose_1.default.model('User', UserSchema);
exports.default = UserModel;
