const fs = require('fs');
const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())

const server = app.listen(process.env.PORT || 5000)

const path = require('path');

const file = path.join(__dirname, 'checkin_data_reduced.txt');

let obj;

fs.readFile(file, { encoding: 'utf-8' }, (err, data) => {
    const lines = data.split('\r\n', 3)
    obj = lines.map(line => {
        const register = line.split(/[\t]/);
        return {
            userId: register[0],
            placeId: register[1],
            placeHits: register[2],
            lat: register[3],
            lon: register[4],
            datetime: register[5],
            message: register[6]
        }
    })
})

app.use('/', express.static(__dirname + '/public'))
app.get('/data', (req, res) => {
    res.json(obj)
})
