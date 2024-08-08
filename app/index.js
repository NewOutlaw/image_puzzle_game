import { createRequire } from "module";
const require = createRequire(import.meta.url);

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();


var port = process.env.PORT;

app.use(express.static('/app/public'));

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile('/index.html');
})

app.listen(port, () => {
    console.log("environment started at port " + port);
});