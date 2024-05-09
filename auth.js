const passport = require("passport")
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const GOOGLE_CLIENT_ID = "397029520637-1frj48t2n0nf822krgskublmk3cqnij6.apps.googleusercontent.com"
const GOOGLE_CLIENT_SECRET = "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"

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
      return done(null, profile);
  }
));

passport.serializeUser(function(user,done) {
    done(null, user)
})

passport.deserializeUser(function(user,done) {
    done(null, user)
})