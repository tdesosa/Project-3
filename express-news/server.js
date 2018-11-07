const express        = require('express');
const app            = express();
// const bodyParser     = require('body-parser');
// const cors           = require('cors');
// const session        = require('express-session')

require('./db/db');


app.use(session({
  secret: 'lebron is the goat',
  resave: false,
  saveUninitialized: false
}));

// Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true, // This allows the session cookie to be sent back and forth
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));



// Controllers
const userController = require('./controllers/userController');
const authController  = require('./controllers/authController');

app.use('/api/v1/users', userController);
app.use('/auth', authController);

app.listen(process.env.PORT || 9000, () => {
  console.log('listening on port 9000');
});
