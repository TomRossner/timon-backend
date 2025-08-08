export const EVENT_TYPES = [
    "league",
    "tournament",
]

export enum EventTypes {
    LEAGUE = "league",
    TOURNAMENT = "tournament",
}

export type EventType = "league" | "tournament";

export type EventData = {
    eventId: string;
    title: string;
    teams: string[];
    type: EventType;
    banner?: string;
    logo?: string;
    startDate: Date;
    endDate: Date;
    createdBy: string;
    address: {
        city: string;
        fieldAddress: string;
        fieldName?: string;
        location: {
            long: number;
            lat: number;
        }
    }
}