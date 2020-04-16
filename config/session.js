/**
 * Session Configuration
 * (sails.config.session)
 *
 * Use the settings below to configure session integration in your app.
 * (for additional recommended settings, see `config/env/production.js`)
 *
 * For all available options, see:
 * https://sailsjs.com/config/session
 */

module.exports.session = {
  /** *************************************************************************
   *                                                                          *
   * Session secret is automatically generated when your new app is created   *
   * Replace at your own risk in production-- you will invalidate the cookies *
   * of your users, forcing them to log in again.                             *
   *                                                                          *
   ***************************************************************************/

  /** *************************************************************************
   *                                                                          *
   * Set the session cookie expire time The maxAge is set by milliseconds,    *
   * the example below is for 24 hours                                        *
   *                                                                          *
   ***************************************************************************/

  cookie: {
    domain: "https://kiffgo-development.herokuapp.com",
    maxAge: 24 * 60 * 60 * 1000,
    // maxAge: 60000
    // previous value 24 * 60 * 60 * 1000,
  },

  /** *************************************************************************
   *                                                                          *
   * Uncomment the following lines to set up a Redis session store that can   *
   * be shared across multiple Sails.js servers.                              *
   *                                                                          *
   * Requires connect-redis (https://www.npmjs.com/package/connect-redis)     *
   *                                                                          *
   ***************************************************************************/

  adapter: "redis",

  /** *************************************************************************
   *                                                                          *
   * The following values are optional, if no options are set a redis         *
   * instance running on localhost is expected. Read more about options at:   *
   *                                                                          *
   * https://github.com/visionmedia/connect-redis                             *
   *                                                                          *
   ***************************************************************************/

  // host: 'localhost',
  // port: 6379,
  // ttl: <redis session TTL in seconds>,
  // db: 0,
  // pass: <redis auth password>,
  // prefix: 'sess:',

  /** *************************************************************************
   *                                                                          *
   * Uncomment the following lines to set up a MongoDB session store that can *
   * be shared across multiple Sails.js servers.                              *
   *                                                                          *
   * Requires connect-mongo (https://www.npmjs.com/package/connect-mongo)     *
   * Use version 0.8.2 with Node version <= 0.12                              *
   * Use the latest version with Node >= 4.0                                  *
   *                                                                          *
   ***************************************************************************/

  // adapter: 'mongo',
  // url: 'mongodb://user:password@localhost:27017/dbname', // user, password and port optional

  /** *************************************************************************
   *                                                                          *
   * Optional Values:                                                         *
   *                                                                          *
   * See https://github.com/kcbanner/connect-mongo for more                   *
   * information about connect-mongo options.                                 *
   *                                                                          *
   * See http://bit.ly/mongooptions for more information about options        *
   * available in `mongoOptions`                                              *
   *                                                                          *
   ***************************************************************************/

  // collection: 'sessions',
  // stringify: true,
  // mongoOptions: {
  //   server: {
  //     ssl: true
  //   }
  // }

  // CUSTOM OPTIONS
  saveUninitialized: false,
  resave: false,
  name: "kiffgo",
};
