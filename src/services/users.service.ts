import { FilterQuery, UpdateQuery } from "mongoose";
import UserModel, { UserDoc } from "../models/user.model";
import { NewUserData } from "../types/user";
import PlayerModel from "../models/player.model";
import TeamModel from "../models/team.model";
import bcrypt from "bcrypt";
import { HASH_ROUNDS } from "../lib/constants";
import { v4 as uuid} from "uuid";

type UserQueryOptions = {
    stripPassword: boolean;
}

export const findUser = async (query: FilterQuery<UserDoc>, options?: UserQueryOptions) => {
    const users = await UserModel
        .find(query)
        .select(options?.stripPassword
            ? { __v: 0, password: 0 }
            : { __v: 0 }
        )
        .lean();

    return users;
}

export const createNewUser = async (userData: NewUserData) => {
    const hashedPassword = await bcrypt.hash(userData.password, HASH_ROUNDS);
    
    return (await UserModel.create({
        ...userData,
        uid: uuid(),
        password: hashedPassword,
    })).toObject();
}

export const updateUser = async (query: FilterQuery<UserDoc>, update: UpdateQuery<UserDoc>) => {
    return await UserModel.findOneAndUpdate(query, update, { new: true }).lean();
}

export const deleteUser = async (uid: string) => {
    // Delete the user
    const deletedUser = await UserModel.findOneAndDelete({ uid });

    if (!deletedUser) return null;

    // Delete the Player associated with this user
    const deletedPlayer = await PlayerModel.findOneAndDelete({ user: deletedUser._id });

    if (deletedPlayer) {
        // Remove player from team's roster
        await TeamModel.updateOne(
            { _id: deletedPlayer.team },
            { $pull: { roster: deletedPlayer._id } }
        );
    }

    return deletedUser;
}