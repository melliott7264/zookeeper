const express = require('express');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

// set port for Heroku, if available, or 3001 by default
const PORT = process.env.PORT || 3001;

const app = express();

// parse incoming string or array data
app.use(express.urlencoded({extended: true}));

// parse incoming JSON data
app.use(express.json());

// make everything in 'public' available over HTTP
app.use(express.static('public'));

app.use('/api', apiRoutes);

app.use('/', htmlRoutes);


app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});