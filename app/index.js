const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();

//SETS MODE EITHER LIVE OR LOCAL
var live_or_local = process.env.LIVE_OR_LOCAL; //SET IN DOCKERFILE

var live_url = process.env.URL_LIVE;
var live_port = parseInt(process.env.PORT_LIVE);
console.log(live_port);

var local_url = process.env.URL_LOCAL;
var local_port = parseInt(process.env.PORT_LOCAL);


console.log(`${live_url} ${live_port}`)

var serverUrl = local_url + local_port;
var port = local_port;

if(live_or_local == 'live')
{
    serverUrl = live_url;
    port = live_port;
}

const publicDirectoryPath = path.join(__dirname, '/public')
app.use(express.static(publicDirectoryPath))

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile('/index.html');
})

app.listen(port, () => {
    console.log(live_or_local + " environment started at port " + port);
});