const mongoose = require('mongoose');

const websiteSchema = new mongoose.Schema({
    logo_src: {
        type: String,
        default: "images/default_website_icon.png"
    },
    description: {
        type: String,
        required: false,
        default: "",
    },
    url: {
        type: String,
        required: true
    },
    launch_date: {
        type: Date,
        required: false,
        default: Date.now
    }
});

module.exports =  mongoose.model("Website", websiteSchema);