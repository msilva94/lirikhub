const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const morgan = require('morgan');
const rfs = require('rotating-file-stream');
const config = require('./config/database');

mongoose.connect(config.database);

// On Connection
mongoose.connection.on('connected', function() {
    console.log('Connected to database ' + config.database);
});

// On Error
mongoose.connection.on('error', function(err) {
    console.log('Database error ' + err);
});

const app = express();

const users = require('./routes/users');
const subsundays = require('./routes/subsundays');
const playthroughs = require('./routes/playthroughs');
const hotlines = require('./routes/hotlines');
const fmfs = require('./routes/fmfs');
const battlestations = require('./routes/battlestations');
const liriknchill = require('./routes/liriknchill');
const emotes = require('./routes/emotes');
const badges = require('./routes/badges');
const stream = require('./routes/stream');
const games = require('./routes/games');

// Server Port
const port = 8000;

// Log Setup
const logDirectory = path.join(__dirname, 'log');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

var accessLogStream = rfs('access.log', {
    interval: '1d',
    path: logDirectory
});

// Morgan Middleware
app.use(morgan('combined', {stream: accessLogStream}));

// CORS Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

// Index Route
app.get('/api', function(req, res) {
    res.send('Invalid Endpoint');
})

// Users Route
app.use('/api/users', users);

// Subsundays Route
app.use('/api/subsundays', subsundays);

// Playthroughs Route
app.use('/api/playthroughs', playthroughs);

// Hotlines Route
app.use('/api/hotlines', hotlines);

// Fight me Friday Route
app.use('/api/fmfs', fmfs);

// Battlestations Route
app.use('/api/battlestations', battlestations);

// Lirik and Chill Route
app.use('/api/liriknchill', liriknchill);

// Emotes Route
app.use('/api/emotes', emotes);

// Badges Route
app.use('/api/badges', badges);

// Stream Route
app.use('/api/stream', stream);

// Games Route
app.use('/api/games', games);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Start Server
app.listen(port, function() {
    console.log('Server started on port ' + port);
});