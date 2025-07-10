import { FilterQuery, UpdateQuery } from "mongoose";
import PlayerModel, { PlayerDoc } from "../models/player.model";
import { Player } from "../types/player";

// Needed for populations paths
import "../models/player.model";
import "../models/team.model";
import "../models/user.model";

const USER_SELECT_FIELDS = { __v: 0, password: 0 };

export const findPlayer = async (query: FilterQuery<PlayerDoc>) => {
    const players = await PlayerModel
        .find(query)
        .select({ __v: 0 })
        .populate({ path: 'user', select: USER_SELECT_FIELDS })
        .populate({
            path: 'team',
            populate: [
                { path: 'manager', select: USER_SELECT_FIELDS },
                { path: 'roster', populate: { path: 'user', select: USER_SELECT_FIELDS }, select: { __v: 0 } },
                { path: 'coaches', populate: { path: 'user', select: USER_SELECT_FIELDS }, select: { __v: 0 } }
            ],
            select: { __v: 0 }
        })
        .lean();

    return players;
}

export const createNewPlayer = async (playerData: Player) => {
    return (await PlayerModel.create(playerData)).toObject();
}

export const updatePlayer = async (query: FilterQuery<PlayerDoc>, update: UpdateQuery<PlayerDoc>) => {
    return await PlayerModel.findOneAndUpdate(query, update, { new: true }).lean();
}

export const deletePlayer = async (id: string) => {
    return await PlayerModel.findOneAndDelete({ user: id });
}