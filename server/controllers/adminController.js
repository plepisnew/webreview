const Admin = require("../model/Admin");

// TODO: add filtering with query params

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
  try {
    const admin = await Admin.findById(adminId);
    if (admin) return res.status(200).json(admin); // Valid and existent id
    res
      .status(400)
      .json({ message: `Can't find Admin with ObjectId ${adminId}` }); // Valid and non-existent id
  } catch (err) {
    res.status(400).json({ message: err.message }); // Invalid id
  }
};

const putSpecificAdmin = async (req, res) => {
  const adminId = req.params.id;
  try {
    const admin = await Admin.findOneAndReplace({ _id: adminId }, req.body); // Replaces admin with body
    res.status(200).json(admin);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const patchSpecificAdmin = async (req, res) => {
  const adminId = req.params.id;
  try {
    const admin = await Admin.findByIdAndUpdate(adminId, req.body); // Updates admin with body
    res.status(200).json(admin);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteSpecificAdmin = async (req, res) => {
  const adminId = req.params.id;
  try {
    const admin = await Admin.findByIdAndDelete(adminId);
    if (admin) return res.status(200).json(admin);
    res
      .status(400)
      .json({ message: `Can't find Admin with ObjectId ${adminId}` });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getAllAdmins,
  createAdmin,
  deleteAllAdmins,
  getSpecificAdmin,
  putSpecificAdmin,
  patchSpecificAdmin,
  deleteSpecificAdmin,
};
