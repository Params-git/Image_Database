const mongoose = require("mongoose");
require("dotenv").config();


mongoose.connect(process.env.MONGODB_URL, {
    UseNewUrlParser: true,
    UseUnifiedTopology: true
}).then(() => {
    console.log("connection successful..")
}).catch((e) => {
    console.log("No Connection.")
});

