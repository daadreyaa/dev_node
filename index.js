const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connection = require('./config/db');
const UserSchema = require('./models/UserSchema');

const app = express();
const PORT = 5001;

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
    res.json({ data: "Success" });
    // window.location.href("http://127.0.0.1:3001");
});

app.post('/register', (req, res) => {
    console.log("register")
    console.log(req.body)
    UserSchema.create(req.body)
        .then((data) => res.json({ message: "User Added Successfully", data }))
        .catch((err) => res.status(404).json({ message: "Failed to add User", error: err.message }));
})

app.post('/login', (req, res) => {
    console.log("login")
    console.log(req.body)
    UserSchema.findOne(req.body)
        .then((data) => res.json({ message: "User Found", id: data._id, puzzleId: data.puzzleId }))
        .catch((err) => res.status(404).json({ message: "User not found", error: err.message }));
});

app.get('/test', (req, res) => {
    var collection = connection.db.collection("users")
    collection.find({}).toArray(function (err, data) {
        console.log(data);
        res.json(data); // it will print your collection data
    });
});

app.listen(PORT, () => console.log(`Server running on port http://127.0.0.1:${PORT}`));