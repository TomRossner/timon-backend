import { config } from "dotenv";
config();

import passport from "passport";
import { Strategy as GoogleStrategy, Profile} from "passport-facebook";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET as string;

const CLIENT_URL: string = "http://localhost:3000";
const callbackURL: string = `${CLIENT_URL}/auth/google/callback`;

const options = {
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL,
    scope: ['profile', 'email'],
}

async function verify(accessToken: string, refreshToken: string, profile: Profile) {
    console.log({accessToken, refreshToken, profile});
}

export default passport.use(new GoogleStrategy(options, verify)); 