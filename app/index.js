const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();

const publicDirectoryPath = path.join(__dirname, '/public')
app.use(express.static(publicDirectoryPath))

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile('index.html');
})

app.listen(3000, () => {
    console.log("server listening");
});