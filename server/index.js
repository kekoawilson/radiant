require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require(`./config`);
const axios = require('axios');

const app = express();
app.use(cors());
app.use(bodyParser.json());

//Endpoints

app.get('/', (req, res) => {
    res.send('Server is up!');
});

app.get('/api/search', (req, res) => {
    return axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${config.apiKey}&sort=relevance&per_page=25&format=json&text=${req.query.keyword}&nojsoncallback=1`)
        .then(resp => {
            res.send(resp.data);
        }).catch(error => console.error(error));
});

app.listen(config.port, (err) => {
    if (err) {
        return console.error(`error - ${err}`);
    }

    return console.log(`server running on port: ${config.port}`);
});
