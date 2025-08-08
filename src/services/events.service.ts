import { FilterQuery, UpdateQuery } from "mongoose";
import EventModel, { EventDoc } from "../models/event.model";
import { EventData } from "../lib/events";

export const findEvent = async (query: FilterQuery<EventDoc>) => {
    const events = await EventModel.find(query).select({ __v: 0 });

    return events;
}

export const createNewEvent = async (eventData: EventData) => {
    return (await EventModel.create(eventData)).toObject();
}

export const updateEvent = async (query: FilterQuery<EventDoc>, update: UpdateQuery<EventDoc>) => {
    return await EventModel.findOneAndUpdate(query, update, { new: true }).lean();
}

export const deleteEvent = async (name: string) => {
    return await EventModel.findOneAndDelete({ name });
}