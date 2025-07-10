import mongoose, { InferSchemaType } from "mongoose";
import { Roles, ROLES } from "../lib/roles";

const PlayerSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
    },
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
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
        enum: ROLES,
        default: Roles.HYBRID,
    },
    injured: {
        type: Boolean,
        default: false,
    },
}, {
    collection: 'players',
    timestamps: true,
});

const PlayerModel = mongoose.model('Player', PlayerSchema);

export type PlayerDoc = InferSchemaType<typeof PlayerSchema>;

export default PlayerModel;