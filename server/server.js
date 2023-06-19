let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/userModel');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_TOKEN = process.env.JWT_TOKEN;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static('public'));

// connecting to the database
const mongoDBUrl = process.env.MONGODB_URL;

mongoose.connect(mongoDBUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//function to hash password
async function hashPassword(password) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

let db = mongoose.connection;

db.on('error', () => {
  console.log('Error connecting to the database');
});

db.once('open', () => {
  console.log('Connected to the database');
});

// end of db connection

app.post('/register', async (req, res) => {
  const email = req.body.email;

  let data = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password,
  };

  // hashing the password before storing it in the database
  hashPassword(data.password)
    .then((hashedPassword) => {
      data.password = hashedPassword;
    })
    .catch((error) => {
      console.error('Error hashing password:', error);
    });

  try {
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.send('user with email already exists');
    }
    const savedUser = await User.insertMany(data);
    res.send(savedUser);
  } catch (error) {
    throw error;
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ Error: 'User with provided email not found' });
  }

  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({email: user.email}, JWT_TOKEN);

    return res.json({ status: 'ok', data: token });
  } else {
    return res.json({ status: 'error', error: 'invalid password or username' });
  }

});

app.get('/home', async (req, res) => {
  const token = req.headers.authorization || req.headers.Authorization;

  try {
    const user = jwt.verify(token, JWT_TOKEN);
    const userEmail = user.email;
    User.findOne({ email: userEmail }).then((data) => {
      res.send({ status: 'ok', data: data });
    });
  } catch (error) {
    res.send({ status: 'error', error });
  }
});

app.listen(5000);
console.log('listening at port 5000');
