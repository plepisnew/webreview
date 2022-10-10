const Admin = require("../../model/Admin");

const getAllAdmins = async (req, res) => {
  const admins = await Admin.find(req.query);
  res.status(200).json(admins);
};

const getAdmin = async (req, res) => {
  const adminId = req.params.id;
  try {
    const admin = await Admin.findById(adminId);
    if (admin) return res.status(200).json(admin);
    res.status(404).json({ message: `Admin ${adminId} not found` });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const createAdmin = async (req, res) => {
  try {
    const admin = await Admin.create(req.body);
    res.status(201).json(admin);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getAllAdmins,
  getAdmin,
  createAdmin,
};
