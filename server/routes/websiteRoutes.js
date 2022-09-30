const express = require("express");
const router = express.Router();
const {
    getAllWebsites,
    getCreator,
    createWebsite,
    deleteAllWebsites,
    getSpecificWebsite,
    putSpecificWebsite,
    patchSpecificWebsite,
    deleteSpecificWebsite,
} = require("../controllers/websiteController");
const {getReviewAdmin} = require("../controllers/reviewController");

router.get("/:id", getSpecificWebsite);

router.put("/:id", putSpecificWebsite);

router.patch("/:id", patchSpecificWebsite);

router.delete("/:id", deleteSpecificWebsite);

router.get("/", getAllWebsites);

router.post("/", createWebsite);

router.delete("/", deleteAllWebsites);

router.get("/:id/createdBy", getCreator);

module.exports = router;
