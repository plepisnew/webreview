const Admin = require("../model/Admin");

const getAllAdmins = async (req, res) => {
  const admins = await Admin.find({});
  res.status(200).json(admins);
};

const createAdmin = async (req, res) => {
  try {
    const admin = await Admin.create(req.body);
    res.status(200).json(admin);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteAllAdmins = async (req, res) => {
  const { deletedCount } = await Admin.deleteMany({});
  res.status(200).json({
    message: `Deleted ${deletedCount} ${
      deletedCount === 1 ? "admin" : "admins"
    }`,
  });
};

const getSpecificAdmin = async (req, res) => {
  const adminId = req.params.id;
  const admin = await Admin.findById(adminId);
  if (admin) res.status(200).json(admin);
  res.status(400).json({ message: "Given " });
};

const putSpecificAdmin = async (req, res) => {};

const patchSpecificAdmin = async (req, res) => {};

const deleteSpecificAdmin = async (req, res) => {};

module.exports = {
  getAllAdmins,
  createAdmin,
  deleteAllAdmins,
  getSpecificAdmin,
  putSpecificAdmin,
  patchSpecificAdmin,
  deleteSpecificAdmin,
};
