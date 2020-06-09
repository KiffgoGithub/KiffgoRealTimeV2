/**
 * Production environment settings
 *
 * This file can include shared settings for a production environment,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

module.exports = {
  /***************************************************************************
   * Set the default database connection for models in the production        *
   * environment (see config/connections.js and config/models.js )           *
   ***************************************************************************/

  models: {
    migrate: "safe",
  },

  datastores: {
    default: {
      adapter: "sails-mongo",
      // url:
      //   "mongodb://heroku_gsb54c37:rsnhbu6d5si30vqa12nbbkau46@ds253348.mlab.com:53348/heroku_gsb54c37",

      host: process.env.MONGODB_HOST, // "ds253348.mlab.com",
      port: process.env.MONGODB_PORT, // "53348",
      user: process.env.MONGODB_USER, // "heroku_gsb54c37",
      password: process.env.MONGODB_PWD, // "rsnhbu6d5si30vqa12nbbkau46",
      database: process.env.MONGODB_DB, // "heroku_gsb54c37",
    },
  },

  session: {
    secret: process.env.SESSION_SECRET, // "ab24ab301cdbcat31ca74d4f828dc374",
    adapter: "@sailshq/connect-redis", //'redis',
    url: process.env.SESSION_URI, // "redis://h:p898ccc262c7a584b5376b9870e1ebbc35797e433659784247b553e48279f2ea1@ec2-35-169-207-205.compute-1.amazonaws.com:16829",
    cookie: {
      secure: true,
    },
  },

  sockets: {
    adapter: "socket.io-redis",
    url: process.env.SOCKET_URI, // "redis://h:p898ccc262c7a584b5376b9870e1ebbc35797e433659784247b553e48279f2ea1@ec2-35-169-207-205.compute-1.amazonaws.com:16829",
  },
  /***************************************************************************
   * Set the port in the production environment to 80                        *
   ***************************************************************************/

  // port: 80,

  /***************************************************************************
   * Set the log level in production environment to "silent"                 *
   ***************************************************************************/

  // log: {
  //   level: "silent"
  // }
};
