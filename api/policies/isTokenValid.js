/**
 * isTokenValid
 *
 * @module      :: Policy
 * @description :: Check endpoint is called with cyfe private key
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
const moment = require("moment");
const crypto = require("crypto");
module.exports = async (req, res, next) => {
  // csrf token should contain only uppercase letter, lowercase letters, digits and '-' character
  if (req.param("secretKey") === global.secretKey) {
    if (req.param("token")) {
      var decipher = crypto.createDecipher("aes-256-cbc", "d6F3Efeq");
      var decrypted = decipher.update(req.param("token"), "hex", "utf8");
      decrypted += decipher.final("utf8");
      var splited = decrypted.split("$");
      if (req.param("userId")) {
        if (
          moment(splited[1]).diff(moment()) > 0 &&
          req.param("userId") == splited[2]
        ) {
          return next();
        }
      } else {
        return res.badRequest({ status: false, err: "Missing Param" });
      }
      return res.badRequest({ status: false, err: "Token invalid" });
    } else {
      return res.badRequest({ status: false, err: "token required" });
    }
  } else {
    return res.badRequest({ status: false, err: "unauthorized user" });
  }
};
