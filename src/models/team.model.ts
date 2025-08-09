import mongoose, { InferSchemaType } from "mongoose";
import { Divisions, DEFAULT_DIVISIONS } from "../lib/divisions";

const AddressSchema = new mongoose.Schema({
    city: { type: String, required: true },
    fieldAddress: { type: String, required: true },
    fieldName: { type: String },
    location: {
        lat: { type: Number, required: true },
        long: { type: Number, required: true },
    },
}, { _id: false });

const TeamSchema = new mongoose.Schema({
    teamId: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    division: {
        type: String,
        enum: DEFAULT_DIVISIONS,
        required: true,
        default: Divisions.PRO,
    },
    manager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null,
    },
    coaches: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
    }],
    roster: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
    }],
    logo: {
        type: String,
        default: null,
    },
    address: {
        type: AddressSchema,
        required: true,
    },
}, {
    collection: 'teams',
    timestamps: true,
});

const TeamModel = mongoose.model('Team', TeamSchema);

export type TeamDoc = InferSchemaType<typeof TeamSchema>;

export default TeamModel;