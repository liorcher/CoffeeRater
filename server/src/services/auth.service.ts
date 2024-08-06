import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as LocalStrategy } from "passport-local";
import User from "../models/user";

passport.serializeUser((user, done) => {
  done(null, (user as any)._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: "/api/v1/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ userId: profile.id });

        if (!user) {
          user = new User({
            userId: profile.id,
            userName: profile.displayName,
            avatarUrl: profile.photos?.pop()?.value,
            firstName: profile.name?.givenName,
            lastName: profile.name?.familyName,
            email: profile.emails?.pop()?.value,
          });

          await user.save();
        }

        done(null, user);
      } catch (err) {
        done(err, undefined);
      }
    }
  )
);

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ userName: username });
      if (!user) {
        return done(null, false, { message: "Incorrect username." });
      }
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return done(null, false, { message: "Incorrect password." });
      }
      return done(null, user);
    } catch (err) {
      return done(err, undefined);
    }
  })
);

export default passport;
