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

      host: "ds253348.mlab.com",
      port: "53348",
      user: "heroku_gsb54c37",
      password: "rsnhbu6d5si30vqa12nbbkau46",
      database: "heroku_gsb54c37",
    },
  },

  session: {
    secret: "ab24ab301cdbcat31ca74d4f828dc374",
    adapter: "connect-redis", //'redis',
    url:
      "redis://h:p10804ed3aa101a03c47e79ab200c94477bc544ed3e9b51debc16a5692f691c1f@ec2-108-128-150-19.eu-west-1.compute.amazonaws.com:9399",
    cookie: {
      secure: true,
    },
  },

  sockets: {
    adapter: "socket.io-redis",
    url:
      "redis://h:p10804ed3aa101a03c47e79ab200c94477bc544ed3e9b51debc16a5692f691c1f@ec2-108-128-150-19.eu-west-1.compute.amazonaws.com:9399",
    onlyAllowOrigins: [
      "http://www.mydeployedapp.com",
      "http://mydeployedapp.com",
    ],
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
