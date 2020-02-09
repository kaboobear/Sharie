const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");


const Login = mongoose.model("Auth");


const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = '123123nko';

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      Login.findById(jwt_payload.id)
        .then(login => {
          if (login) {
            return done(null, login);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};