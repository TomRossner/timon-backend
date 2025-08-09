"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const events_1 = require("../lib/events");
const AddressSchema = new mongoose_1.default.Schema({
    city: { type: String, required: true, trim: true },
    fieldAddress: { type: String, required: true, trim: true },
    fieldName: { type: String, trim: true },
    location: {
        lat: { type: Number, required: true },
        long: { type: Number, required: true },
    },
}, { _id: false });
const EventSchema = new mongoose_1.default.Schema({
    eventId: {
        type: String,
        unique: true,
        require: true,
    },
    title: {
        type: String,
        require: true,
        trim: true,
    },
    teams: {
        type: [mongoose_1.default.Schema.Types.ObjectId],
        ref: 'Team',
        default: [],
    },
    type: {
        type: String,
        enum: events_1.EVENT_TYPES,
        require: true,
    },
    banner: {
        type: String,
        default: '',
    },
    logo: {
        type: String,
        default: '',
    },
    startDate: {
        type: Date,
        require: true,
    },
    endDate: {
        type: Date,
        require: true,
    },
    address: {
        type: AddressSchema,
        default: null,
    },
    createdBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
    }
}, {
    collection: 'events',
    timestamps: true,
});
const EventModel = mongoose_1.default.model('Event', EventSchema);
exports.default = EventModel;
