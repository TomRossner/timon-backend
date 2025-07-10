import { Team } from "./team";

export type UID = string;

export type UserSummary = {
    uid: UID,
    email: string;
    firstName: string;
    lastName: string;
    userName: string;
    phoneNumber: string;
    image: string;
    online: boolean;
    gender: Gender;
}

export type Gender = "male" | "female" | "non-binary" | "prefer_not_to_say";

export type Users = Map<UID, UserSummary>;

export type UserProfile = UserSummary & {
    createdAt: Date;
    team: Team;
    jerseyNumber: number;
}

export type FullUser = UserSummary & UserProfile;

export type NewUserData = Omit<UserSummary, "uid"> & {
    password: string;
}