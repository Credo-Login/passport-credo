/**
 * Module dependencies.
 */
var util = require('util')
  , OAuth2Strategy = require('passport-oauth2');

/**
 * `Strategy` constructor.
 *
 * The Credo authentication strategy authenticates requests by delegating
 * to Credo using the OAuth 2.0 protocol.
 *
 * Applications must supply a `verify` callback which accepts an `accessToken`,
 * `refreshToken` and service-specific `profile`, and then calls the `done`
 * callback supplying a `user`, which should be set to `false` if the
 * credentials are not valid. If an exception occured, `err` should be set.
 *
 * Options:
 *   - `clientID`      your Credo application's client id
 *   - `clientSecret`  your Credo application's client secret
 *   - `callbackURL`   URL to which Credo will redirect the user after granting authorization
 *
 * Examples:
 *
 *     passport.use(new CredoStrategy({
 *         clientID: '123-456-789',
 *         clientSecret: 'shhh-its-a-secret'
 *         callbackURL: 'https://www.example.net/auth/credo/callback'
 *       },
 *       function(accessToken, profile, done) {
 *         User.findOrCreate(..., function (err, user) {
 *           done(err, user);
 *         });
 *       }
 *     ));
 *
 * @param {Object} options
 * @param {Function} verify
 * @api public
 */
function Strategy(options, verify) {
  options = options || {};
  options.authorizationURL = options.authorizationURL || 'http://usecredo.com/api/oauth2/authorize';
  options.tokenURL = options.tokenURL || 'http://usecredo.com:8000/api/oauth2/token';

  OAuth2Strategy.call(this, options, verify);
  this.name = 'credo';
}

/**
 * Inherit from `OAuth2Strategy`.
 */
util.inherits(Strategy, OAuth2Strategy);

/**
 * Retrieve user profile from Credo.
 *
 * This function constructs a normalized profile, with the following properties:
 *
 *   - `provider`         always set to `credo`
 *   - `id`               the user's Credo username
 *   - `displayName`      the user's full name
 *
 * @param {String} accessToken
 * @param {Function} done
 * @api protected
 */
Strategy.prototype.userProfile = function(accessToken, done) {
  this._oauth2.getProtectedResource('http://usecredo.com:8000/user', accessToken.value, function (err, body, res) {
    if (err) { return done(err); }

    try {
      o = JSON.parse(body);

      var profile = { provider: 'credo' };
      profile.id = o.id;
      profile.displayName = o.username;

      done(null, profile);
    } catch(e) {
      done(e);
    }
  });
}

/**
 * Expose `Strategy`.
 */
module.exports = Strategy;
