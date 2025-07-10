import { Teams } from "./team";
import { Users } from "./user";

export type EventID = string;

export type EventData = {
    eventId: EventID;
    eventName: string;
    dates: Dates;
    organizers: Users;
    participants: Users;
    teams: Teams;
    description: string;
}

export type Dates = {
    start: Date;
    end: Date;
}

export type Event = EventData;

export type Events = Map<EventID, EventData>;