import { TeamData } from "./team";
import { UID, UserSummary } from "./user";

export type Player = {
  user: UserSummary;
  team: TeamData;
  jerseyNumber: number;
  isCaptain?: boolean;
  role?: Role;
  injured?: boolean;
}

export type Role = "handler" | "cutter" | "hybrid";

export type Players = Map<UID, Player>;