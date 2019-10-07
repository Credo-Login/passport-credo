# passport-credo

[Passport](http://passportjs.org/) strategy for authenticating with [Credo](http://www.usecredo.com/)
using the OAuth 2.0 API.

This module lets you authenticate using Credo in your Node.js applications.
By plugging into Passport, Credo authentication can be easily and
unobtrusively integrated into any application or framework that supports
[Connect](http://www.senchalabs.org/connect/)-style middleware, including
[Express](http://expressjs.com/).

## Install

    $ npm install passport-credo

## Usage

#### Create an Application

Before using `passport-credo`, you must register an application with
Credo.  If you have not already done so, a new application can be created at
[Credo Developers](https://developers.usecredo.com/).  Your application will
be issued an app ID and app secret, which need to be provided to the strategy.
You will also need to configure a redirect URI which matches the route in your
application.

#### Configure Strategy

The Credo authentication strategy authenticates users using a Credo
account and OAuth 2.0 tokens.  The app ID and secret obtained when creating an
application are supplied as options when creating the strategy.  The strategy
also requires a `verify` callback, which receives the access token and optional
refresh token, as well as `profile` which contains the authenticated user's
Credo profile.  The `verify` callback must call `cb` providing a user to
complete authentication.

```js
passport.use(new CredoStrategy({
    clientID: CREDO_APP_ID,
    clientSecret: CREDO_APP_SECRET,
    callbackURL: "http://localhost:3000/auth/credo/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ credoId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));
```

#### Authenticate Requests

Use `passport.authenticate()`, specifying the `'credo'` strategy, to
authenticate requests.

For example, as route middleware in an [Express](http://expressjs.com/)
application:

```js
app.get('/auth/credo',
  passport.authenticate('credo'));

app.get('/auth/credo/callback',
  passport.authenticate('credo', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });
```

## Examples

Developers using the popular [Express](http://expressjs.com/) web framework can
refer to an [example](https://github.com/Credo-Login/express-4.x-credo-example)
as a starting point for their own web applications.

## License

[The MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2019 Alexandru Niculae <[https://github.com/alexnix](https://github.com/alexnix)>
