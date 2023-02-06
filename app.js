const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');
const itemsRoute = require('./routes/items');

//middleware
app.use(bodyParser.json());
app.use('/api/items', itemsRoute);

//Database connection
mongoose.set("strictQuery", false);
try{
    mongoose.connect(
        process.env.DB_CONNECTION,
        {useNewUrlParser: true},
        () => console.log('successfully connected to DB...!')
    );
}catch(err) {
    console.log({message: err});
};

var PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`app is listening on port number ${PORT}`));