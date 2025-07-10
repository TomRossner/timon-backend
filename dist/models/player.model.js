"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const roles_1 = require("../lib/roles");
const PlayerSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
    },
    team: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
const PlayerModel = mongoose_1.default.model('Player', PlayerSchema);
exports.default = PlayerModel;
