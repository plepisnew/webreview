const Admin = require("../model/Admin");
const Website = require("../model/Website");

const admins = require("../data/admins.json");
const websites = require("../data/websites.json");

/**
 * Sets up default data, such as initial admins and websites
 * Should only be called after a connection with the database has been established e.g. as a callback in mongoose.connect()
 */
const addBaseData = () => {
  admins.forEach(async (admin) => await Admin.create(admin));
  websites.forEach(async (website) => await Website.create(website));
};

module.exports = addBaseData;
