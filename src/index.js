const express = require('express');
const app = express();
const {PORT, CLIENT_URL} = require('./constants');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const cors = require('cors');

require('./middlewares/passport-middleware');

app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: CLIENT_URL, credentials: true}));
app.use(passport.initialize());

const authRouter = require('./routes/auth');



app.use('/api', authRouter);


const appStart = () => {
    try {
        app.listen(PORT, ()=> {
            console.log(`The app is running at http://localhost:${PORT}`);
        })
    } catch (error) {
        console.log(`Error: ${error}`);
    }
}

appStart();