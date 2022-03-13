const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();

const publicDirectoryPath = path.join(__dirname, '/public')
app.use(express.static(__dirname + '/public'))

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, () => {
    console.log("server listening");
});