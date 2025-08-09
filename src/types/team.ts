import { UID, UserSummary } from "./user";

export type TeamID = string;

export type TeamData = {
    name: string;
    manager: UserSummary;
    coaches: Map<UID, UserSummary>;
    roster: Map<UID, UserSummary>;
    logo: string;
    address: Address;
}

export type Team = TeamData & {
    teamId: TeamID;
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

export type Teams = Map<TeamID, TeamData>;