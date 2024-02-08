
const DestinationModel = require("./models/Destination");

const { Router } = require('express');
const app = Router();

app.get('/destination/:name',findOneDescription());

