const mongoose = require('mongoose');

const websiteSchema = new mongoose.Schema({
    logoSrc: {
        type: String,
        default:"images/default_website_icon.png"
    },
    description: {
        type: String,
        required: false,
        default: "",
    },
    url: {
        type: String,
        required: true,
        unique: true,
    },
    launchDate: {
        type: Date,
        required: false,
        default: () => Date.now(),
    },
    createdBy: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
    }
},
    {
        timestamps: true
    }
);

const Website = mongoose.model("Website", websiteSchema);
module.exports = Website;