const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const path = require('path');

const api = require('./routes/api');
const port = 3000;

const app = express();
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin",
    "http://localhost:4200");

    res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-with, Content-Type, Accept");

    next();
});
app.use(cors())
app.use(express.static(path.join(__dirname, 'dist')));

app.use(bodyParser.json()); 

app.use('/api', api);

app.listen(port, function(){
    console.log("Marvellous Innfosystems : Server running on localhost:" + port);
});