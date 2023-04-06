const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const User = require('./models/user');
const cors = require('cors');

require('dotenv').config();

const app = express();
app.use(cors());

// Set up the MongoDB connection
mongoose.connect('mongodb://Breyan:Breyan123@ac-3uyi0ct-shard-00-00.fjsstsk.mongodb.net:27017,ac-3uyi0ct-shard-00-01.fjsstsk.mongodb.net:27017,ac-3uyi0ct-shard-00-02.fjsstsk.mongodb.net:27017/?ssl=true&replicaSet=atlas-hrq601-shard-0&authSource=admin&retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected to MongoDB');
});

// Parse JSON request bodies
app.use(express.json());

// Add the API routes
app.use('/', routes);
console.log(process.env.JWT_SECRET)
// Set up the JWT secret
app.set('jwtSecret', process.env.JWT_SECRET);

// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
