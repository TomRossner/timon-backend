"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const genders_1 = require("../../lib/genders");
const roles_1 = require("../../lib/roles");
const PlayerSchema = new mongoose_1.default.Schema({
    user: {
        uid: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
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
            trim: true,
        },
        image: {
            type: String,
            default: '',
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
    },
    teamId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    jerseyNumber: {
        type: Number,
        required: true,
    },
    isCaptain: {
        type: Boolean,
        default: false,
    },
    role: {
        type: String,
        enum: roles_1.ROLES,
        default: roles_1.Roles.HYBRID,
    },
    injured: {
        type: Boolean,
        default: false,
    },
}, {
    collection: 'players',
    timestamps: true,
});
exports.default = mongoose_1.default.model('Player', PlayerSchema);
