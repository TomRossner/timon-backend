import { PlayerDoc } from "../models/player.model";
import { TeamDoc } from "../models/team.model";
import { UserDoc } from "../models/user.model";

// export type PopulatedUser = Omit<PlayerDoc, 'user'> & { user: UserDoc };

// export type PopulatedTeam = Omit<PlayerDoc, 'team'> & { team: TeamDoc };

export type PopulatedPlayer = Omit<PlayerDoc, 'user' | 'team'> & {
  user: UserDoc;
  team: Omit<TeamDoc, 'manager' | 'roster' | 'coaches'> & {
    manager: UserDoc;
    roster: Record<string, { user: UserDoc }>;
    coaches: Record<string, { user: UserDoc }>;
  };
};