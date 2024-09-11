const express = require('express');
const router = require('./src/routes/api');
const app = new express();

const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');

const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require("path");
require("dotenv").config();


let URL = "mongodb+srv://<username>:<password>@atlascluster.ufe1snn.mongodb.net/Inventory"
let OPTION = {user: process.env.DB_USER, pass: process.env.DB_PASS, autoIndex: true}


mongoose.connect(URL, OPTION).then((res) => {
    console.log("Database Connected")
}).catch((err) => {
    console.log(err)
})

app.use(cookieParser());
app.use(bodyParser.json())
app.use(cors())
app.use(helmet())
// app.use(
//     helmet({
//         contentSecurityPolicy: false,
//         xDownloadOptions: false,
//     }),
// );
app.use(mongoSanitize())
app.use(xss())
app.use(hpp())

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb',extended: true}));

const limiter = rateLimit({windowMs: 15 * 60 * 1000, max: 3000})
app.use(limiter)

app.set('etag', false);
app.use("/api", router)
// app.use(express.static(path.join(__dirname, 'client', 'dist')));
// app.use('/images', express.static(path.join(__dirname, 'public', 'images')));
//
// app.use(express.static('client/dist'));
//
//
// app.get('*', function (req, res) {
//     res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
// })

module.exports = app;