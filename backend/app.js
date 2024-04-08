require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const router = require("./routers/router");

mongoose.connect(process.env.MONGODB_URL);

const cors = require('cors');
const port = process.env.PORT;
const corsOptions = {
    origin : process.env.CORS_ORIGIN,
    Credential : true,
}

app.use(cors());

app.use(express.json());
app.use("/api/users", router);

app.listen(port, () => {
    console.log("server running on port : ", port)
})