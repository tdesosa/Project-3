const express    = require('express');
const app        = express();
const bodyParser = require('body-parser');
const cors       = require('cors');
const session    = require('express-session');
const bcrypt     = require('bcryptjs');
const path       = require('path');
const dotenv     = require('dotenv');

require('dotenv').config();


require('./db/db');


app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

// Middleware
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


const corsOptions = {
  origin: process.env.REACT_APP_ADDRESS,
  credentials: true, // This allows the session cookie to be sent back and forth
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));



// Controllers
const userController = require('./controllers/userController');
const authController  = require('./controllers/authController');

app.use('/api/v1/users', userController);
app.use('/api/v1/auth', authController);

app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.listen(process.env.PORT || 9000, () => {
  console.log('listening on port 9000');
});