import { FilterQuery, UpdateQuery } from "mongoose";
import EventModel, { EventDoc } from "../models/event.model";
import { EventData } from "../types/event";
import { v4 as uuid } from "uuid";

const USER_SELECT_FIELDS = { __v: 0, password: 0 };

export const findEvent = async (query: FilterQuery<EventDoc>) => {
    const events = await EventModel.find(query);

    if (!events.length) return [];
    
    const populatedEvents = await Promise.all(
        events.map(async (event) =>
            await EventModel
                .findById(event._id)
                .select({ __v: 0 })
                .populate({
                    path: 'teams',
                    populate: [
                        { path: 'manager', select: USER_SELECT_FIELDS },
                        { path: 'roster', populate: { path: 'user', select: USER_SELECT_FIELDS }, select: { __v: 0 } },
                        { path: 'coaches', populate: { path: 'user', select: USER_SELECT_FIELDS }, select: { __v: 0 } }
                    ],
                    select: { __v: 0 },
                }).populate({
                    path: 'createdBy',
                    select: USER_SELECT_FIELDS,
                })
                .lean()
        )
    );

    return populatedEvents;
}

export const createNewEvent = async (eventData: EventData) => {
    return (await EventModel
        .create({
            ...eventData,
            eventId: uuid(),
        }))
        .toObject();
}

export const updateEvent = async (query: FilterQuery<EventDoc>, update: UpdateQuery<EventDoc>) => {
    return await EventModel.findOneAndUpdate(query, update, { new: true }).lean();
}

export const deleteEvent = async (eventId: string) => {
    return await EventModel.findOneAndDelete({ eventId });
}