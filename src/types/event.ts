export type EventID = string;

export type EventType = "league" | "tournament";

export type EventData = {
    eventId: EventID;
    title: string;
    teams: string[];
    type: EventType;
    banner?: string;
    logo?: string;
    startDate: Date;
    endDate: Date;
    createdBy: string;
    address?: {
        city: string;
        fieldAddress: string;
        fieldName?: string;
        location: {
            long: number;
            lat: number;
        }
    }
}

export type Event = EventData & {
    eventId: EventID;
}

export type Events = Map<EventID, EventData>;