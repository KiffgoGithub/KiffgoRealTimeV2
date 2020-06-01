/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  /***************************************************************************
   *                                                                          *
   * Make the view located at `views/homepage.ejs` your home page.            *
   *                                                                          *
   * (Alternatively, remove this and add an `index.html` file in your         *
   * `assets` directory)                                                      *
   *                                                                          *
   ***************************************************************************/
  // '/': { view: 'pages/homepage' },
  /***************************************************************************
   *                                                                          *
   * More custom routes here...                                               *
   * (See https://sailsjs.com/config/routes for examples.)                    *
   *                                                                          *
   * If a request to a URL doesn't match any of the routes in this file, it   *
   * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
   * not match any of those, it is matched against static assets.             *
   *                                                                          *
   ***************************************************************************/

  "POST /tracking": {
    controller: "TrackController",
    action: "location",
    csrf: false,
  },

  "POST /get-location": {
    action: "user/get-current-location",
    csrf: false,
  },

  "POST /task-delay": {
    action: "task/delay",
    csrf: false,
  },

  "POST /task-added": {
    action: "task/new-task-added",
    csrf: false,
  },

  "POST /task-updated": {
    action: "task/task-updated",
    csrf: false,
  },

  "POST /test-socket": {
    action: "test/check-socket-connection",
    csrf: false,
  },
};
