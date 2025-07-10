import { UID, UserSummary } from "./user";

export type TeamID = string;

export type TeamData = {
    teamId: TeamID;
    teamName: string;
    manager: UserSummary;
    coaches: Map<UID, UserSummary>;
    roster: Map<UID, UserSummary>;
    logo: string;
    address: Address;
}

export type Address = {
    city: string;
    fieldAddress: string;
    fieldName?: string;
    location: {
        lat: number;
        long: number;
    }
}

export type Team = TeamData;

export type Teams = Map<TeamID, TeamData>;