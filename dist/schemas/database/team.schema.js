"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const genders_1 = require("../../lib/genders");
const roles_1 = require("../../lib/roles");
const UserSummarySchema = new mongoose_1.default.Schema({
    uid: { type: String, required: true, unique: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    userName: { type: String, required: true, trim: true },
    image: { type: String, default: '' },
    online: { type: Boolean, default: false },
    gender: {
        type: String,
        enum: genders_1.GENDERS,
        default: genders_1.Genders.PREFER_NOT_TO_SAY,
    },
}, { _id: false }); // _id: false because these are sub-documents
const PlayerSchema = new mongoose_1.default.Schema({
    user: { type: UserSummarySchema, required: true },
    teamId: { type: String, required: true },
    teamName: { type: String, required: true },
    jerseyNumber: { type: Number, required: true },
    isCaptain: { type: Boolean, default: false },
    role: {
        type: String,
        enum: roles_1.ROLES,
        default: roles_1.Roles.HYBRID,
    },
    injured: { type: Boolean, default: false },
}, { _id: false });
const AddressSchema = new mongoose_1.default.Schema({
    city: { type: String, required: true },
    fieldName: { type: String },
    location: {
        lat: { type: Number, required: true },
        long: { type: Number, required: true },
    },
}, { _id: false });
const TeamSchema = new mongoose_1.default.Schema({
    teamId: {
        type: String,
        required: true,
        unique: true,
    },
    teamName: {
        type: String,
        required: true,
        unique: true,
    },
    manager: {
        type: UserSummarySchema,
        required: true,
    },
    coaches: {
        type: Map,
        of: PlayerSchema,
        default: {},
    },
    roster: {
        type: Map,
        of: PlayerSchema,
        default: {},
    },
    logo: {
        type: String,
        default: '',
    },
    address: {
        type: AddressSchema,
        required: true,
    },
}, {
    collection: 'teams',
    timestamps: true,
});
exports.default = mongoose_1.default.model('Team', TeamSchema);
