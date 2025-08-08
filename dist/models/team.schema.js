"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
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
    name: {
        type: String,
        required: true,
        unique: true,
    },
    manager: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    coaches: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Player',
        }],
    roster: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Player',
        }],
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
const TeamModel = mongoose_1.default.model('Team', TeamSchema);
exports.default = TeamModel;
