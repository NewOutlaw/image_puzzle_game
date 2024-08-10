import { createRequire } from "module";
const require = createRequire(import.meta.url);

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');


var port = process.env.EXPRESS_PORT;


const app = express();
app.use(express.static('/app/public', {index: false})); //index false  does not respond automatically with an index.html file from public dir
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile('/app/public/index.html');
})

app.listen(port, () => {
    console.log("environment started at port " + port);
});
