const mongoose = require("mongoose");
require("dotenv/config")

mongoose.set('strictQuery', true)

mongoose.connect(
    process.env.MONGO_URI,
    {
        useNewUrlParser: true,
    },
    () => console.log('Connected to DB!!')
);

const connection = mongoose.connection;

connection.on('error', console.error.bind(console, 'connection error:'));

module.exports = connection;
