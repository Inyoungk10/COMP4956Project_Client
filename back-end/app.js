const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./models/user');
const ScannedObjectCollection = require('./models/scannedObjectCollection');
const auth = require('./middleware/auth');

/**
 * This is the express server
 * Also handles the login and authentication routes
 * @Author Francis Sapanta, Inyoung Kang, Cameron Wark
 */


const app = express();
require("dotenv").config({ path: "./config.env" });

const port = process.env.PORT || 5555;
app.use(function (req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
});
app.use(express.json());
app.use(require("./routes/Get"));

// get driver connection
const dbo = require("./db/conn");
 
app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
 
  });
  console.log(`Server is running on port: ${port}`);
});
const CONNECTION_URL = 'mongodb+srv://client-team:client-team123@cluster0.agrca.mongodb.net/roomalityDb?retryWrites=true&w=majority';

app.post('/addRoom', (req, res) => {
    console.log(req.body);
});

// not sure if they need to be async or not.
app.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    try {
        console.log(email, password)
        // const existingUser = await User.findOne({ email });
        const existingUser = await ScannedObjectCollection.findOne({ email });

        console.log(existingUser);

        if(!existingUser) return res.status(404).json({ message: "User doesn't exist." });

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if(!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials." });

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: "1h" });

        res.status(200).json({ result: existingUser, token });
    } catch (error) {
        console.log('error');
        res.status(500).json({ message: "Something went wrong." });
    }
});

app.post('/signup', async (req, res) => {
    const { firstName, lastName, email, password, repeatPassword } = req.body;

    try {
        const existingUser = await ScannedObjectCollection.findOne({ email });
        if(existingUser) return res.status(400).json({ message: "User already exists." });

        if(password !== repeatPassword) return res.status(400).json({ message: "Passwords don't match." });

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await ScannedObjectCollection.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });

        const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: "1h" });

        res.status(200).json({ result, token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong." });
    }
});

const MONGOPORT = process.env.MONGOPORT || 3030;
// app.listen(port, () => console.log(`listening on port ${port}...`));
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(MONGOPORT, () => console.log(`Server running on port ${MONGOPORT}`)))
    .catch((error) => console.log(error.message));

// mongoose.set('useFindAndModify', false);
