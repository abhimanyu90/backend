

const express = require('express');
const mongoose = require('mongoose');
const recipeSchema = require('./model/recipeSchema');
const recipeRoute = require('./controller/recipeRoute'); // Correct the import path
const bodyParser = require('body-parser');
const cors = require('cors');

mongoose.set('strictQuery', true);
mongoose.connect(
    'mongodb+srv://challadeepika2004:Deepika2004@cluster0.lakefw4.mongodb.net/recipedb',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

var db = mongoose.connection;
db.on('open', () => console.log('Connected to DB'));
db.on('error', () => console.log('Error Occurred'));

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/recipeRoute', recipeRoute);
app.use('/uploads', express.static('uploads')); // Serve uploaded files statically
app.listen(4000, () => {
    console.log('Server Started at 4000');
});

