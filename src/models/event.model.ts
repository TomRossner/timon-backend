import mongoose, { InferSchemaType } from "mongoose";
import { EVENT_TYPES } from "../lib/events";

const AddressSchema = new mongoose.Schema({
    city: { type: String, required: true },
    fieldAddress: { type: String, required: true },
    fieldName: { type: String },
    location: {
        lat: { type: Number, required: true },
        long: { type: Number, required: true },
    },
}, { _id: false });

const EventSchema = new mongoose.Schema({
    eventId: {
        type: String,
        unique: true,
        require: true,
    },
    title: {
        type: String,
        require: true,
    },
    teams: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Team',
        default: [],
    },
    type: {
        type: String,
        enum: EVENT_TYPES,
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
        require: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
    }
}, {
    collection: 'events',
    timestamps: true,
});

const EventModel = mongoose.model('Event', EventSchema);

export type EventDoc = InferSchemaType<typeof EventSchema>;

export default EventModel;