const express = require("express");
const router = express.Router();
const {
    getAllWebsites,
    createWebsite,
    deleteAllWebsites,
    getSpecificWebsite,
    putSpecificWebsite,
    patchSpecificWebsite,
    deleteSpecificWebsite,
} = require("../controllers/websiteController");

router.get("/:id", getSpecificWebsite);

router.put("/:id", putSpecificWebsite);

router.patch("/:id", patchSpecificWebsite);

router.delete("/:id", deleteSpecificWebsite);

router.get("/", getAllWebsites);

router.post("/", createWebsite);

router.delete("/", deleteAllWebsites);

module.exports = router;
