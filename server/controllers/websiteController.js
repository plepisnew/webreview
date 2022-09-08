const Website = require("../model/Website");

const getAllWebsites = async (req, res) => {
    try {
        const websites = await Website.find({});
        if (websites.length < 1){
            res.status(404).json("No websites found");
        } else {
            res.status(200).json(websites);
        }
    } catch (err) {
        res.status(400).json(err);
    }
};

const createWebsite = async (req, res) => {
    try {
        const website = await Website.create(req.body);
        res.status(200).json(website);
    } catch (err) {
        res.status(400).json({ message: err.message }); // 400 Bad Request, what if the website already exists?
    }
};

const putSpecificWebsite = async (req, res) => {
    const websiteId = req.params.id;
    try {
        const website = await Website.findOneAndReplace({ _id: websiteId }, req.body);
        res.status(200).json(website);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const patchSpecificWebsite = async (req, res) => {
    const websiteId = req.params.id;
    try {
        const website = await Website.findOneAndUpdate({ _id: websiteId }, req.body);
        res.status(200).json(website);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const deleteSpecificWebsite = async (req, res) => {
    const websiteId = req.params.id;
    try {
        const website = await Website.findByIdAndDelete(websiteId);
        if (!website) {
            res.status(400).json({ message: `Can't find Website with ObjectId ${websiteId}` });
        } else {
            return res.status(200).json(website);
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }

};

const deleteAllWebsites = async (req, res) => {
    try {
    const { deletedCount } = await Website.deleteMany({});
    if (deletedCount === 0){
        return res.status(404).json({message: "There are no websites to delete."})
    }
    res.status(200).json({
        message: `Deleted ${deletedCount} ${
            deletedCount === 1 ? "website" : "websites"
        }`,
    });
    } catch (err){
        res.status(400).json({ message: err.message})
    }
}

const getSpecificWebsite = async (req, res) => {
    const websiteId = req.params.id;
    try {
        const website = await Website.findById(websiteId);
        if (website) {
            return res.status(200).json(website);
        } else {
        res.status(400).json({ message: `Can't find Website with ObjectId ${websiteId}` });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

module.exports = {
    getAllWebsites,
    createWebsite,
    deleteAllWebsites,
    getSpecificWebsite,
    putSpecificWebsite,
    patchSpecificWebsite,
    deleteSpecificWebsite,
};