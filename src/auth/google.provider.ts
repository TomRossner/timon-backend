import { config } from "dotenv";
config();

import passport from "passport";
import { Strategy as GoogleStrategy, Profile, VerifyCallback } from "passport-google-oauth20";
import { createNewUser, findUser, updateUser } from "../services/users.service";
import { NewUserData } from "../types/user";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET as string;

const callbackURL: string = `http://localhost:3001/api/auth/google/callback`;

const options = {
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL,
    scope: ['profile', 'email'],
}

async function verify(accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) {
    console.log({accessToken, refreshToken, profile})
    const image = profile._json.picture;
    const email = profile.emails?.length ? profile.emails[0].value : '';
    
    if (!email) {
      throw new Error("Google authentication failed");
    }

    const exists = await findUser({ email });

    if (!exists.length) {
      try {
        const newUser = await createNewUser({
          firstName: profile._json.given_name as string,
          lastName: profile._json.family_name as string,
          email,
        } as NewUserData);

        if (!newUser) {
          throw new Error('Failed creating Google user');
        }
  
        const updatedNewUser = await updateUser(
            { email }, 
            { image, online: true },
            { stripPassword: true }
        );
        
        if (!updatedNewUser) {
          throw new Error('Google user update failed');
        }
  
        return done(null, updatedNewUser);
      } catch (error) {
        console.error(error);
        return done(error, undefined);
      }
    }

    const updatedUser = await updateUser(
        {email},
        { image , online: true },
        { stripPassword: true }
    );

    if (!updatedUser) {
      return done('User update failed', undefined);
    }

    return done(null, updatedUser);
}

export default passport.use(new GoogleStrategy(options, verify)); 
