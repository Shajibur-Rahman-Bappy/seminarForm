const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const port = 3019;

const app = express();
app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/seminar');
const db = mongoose.connection;
db.once('open', () => {
    console.log('Connected to MongoDB');
});

const userSchema = new mongoose.Schema({
    name: String,
    whatsapp: String,
    email: String,
    address: String,

});

const Users = mongoose.model("data", userSchema);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/post',async (req, res) => {
    const { name, whatsapp, email, address } = req.body;
    const user = new Users({
        name,
        whatsapp,
        email,
        address
    });
    await user.save();
    res.send("Form submitted successfully!");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    });