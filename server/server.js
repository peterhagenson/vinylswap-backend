const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
// const pool = require('./modules/pool');

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const apiRouter = require('./routes/api.router');
const searchRouter = require('./routes/search.router');
const profileRouter = require('./routes/profile.router');
// const userInventoryRouter = require('./routes/userInventory.router')
const albumDetailsRouter = require('./routes/details.router');
const traderRouter = require('./routes/trader.router');
const albumToAddRouter = require('./routes/albumToAdd.router');
const threadsRouter = require('./routes/threads.router');
const messagesRouter = require('./routes/messages.router.js');

console.log(process.env.DISCOGS_CONSUMER_KEY, process.env.DISCOGS_CONSUMER_SECRET)
const cors = require("cors")
app.use(cors()); 

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/inventoryAPI', apiRouter);
app.use('/searchDB', searchRouter);
app.use('/profile', profileRouter);
// app.use('/userInventory', userInventoryRouter);
app.use('/details', albumDetailsRouter);
app.use('/trader', traderRouter);
app.use('/albumToAdd', albumToAddRouter);
app.use('/threads', threadsRouter);
app.use('/messages', messagesRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5001;

// ** Listen * * /
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

// server.listen(3001, () => {
//   console.log("SERVER IS RUNNING")
// })
