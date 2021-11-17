import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from './models/user.js';
import auth from './middleware/auth.js';

const app = express();
app.use(cors());

// body paser middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

const CONNECTION_URL = 'mongodb+srv://client-team:client-team123@cluster0.agrca.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';


// not sure if they need to be async or not.
app.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    try {
        console.log(email, password)
        const existingUser = await User.findOne({ email });

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
        const existingUser = await User.findOne({ email });
        if(existingUser) return res.status(400).json({ message: "User already exists." });

        if(password !== repeatPassword) return res.status(400).json({ message: "Passwords don't match." });

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });

        const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: "1h" });

        res.status(200).json({ result, token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong." });
    }
});

const PORT = process.env.PORT || 3000;
// app.listen(port, () => console.log(`listening on port ${port}...`));
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
    .catch((error) => console.log(error.message));

// mongoose.set('useFindAndModify', false);