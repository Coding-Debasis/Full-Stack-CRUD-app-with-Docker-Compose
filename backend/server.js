const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const Item = require('./models/Item');

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://mongo:27017/cruddb', { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/items', async (req, res) => res.json(await Item.find()));
app.post('/items', async (req, res) => res.json(await Item.create(req.body)));
app.put('/items/:id', async (req, res) => res.json(await Item.findByIdAndUpdate(req.params.id, req.body)));
app.delete('/items/:id', async (req, res) => res.json(await Item.findByIdAndDelete(req.params.id)));

app.listen(5000, () => console.log('Backend running on port 5000'));
