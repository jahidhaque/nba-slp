/*
|----------------------------------------------
| This is the entry point for the application
| @author: jahid haque <jahid.haque@yahoo.com>
| @copyright: nba-slp, 2017
|----------------------------------------------
*/
require('dotenv').config({ slient: true });
const Express = require('express');
const BodyParser = require('body-parser');
const Path = require('path');
const Morgan = require('morgan');
const Passport = require('passport');

const App = Express();

// db connection.
require('./app_server/models/db');
require('./app_server/config/passport');

App.use(Morgan('dev'));
App.use(BodyParser.urlencoded({ extended: true }));
App.use(BodyParser.json());

/*
|----------------------------------------------
| Setting up static directory for assets.
|----------------------------------------------
*/
App.use(Express.static(Path.join(__dirname, '/public')));
App.use(Express.static(Path.join(__dirname, '/app_client')));

const apiRoutes = require('./app_server/routes/index');

App.use(Passport.initialize());

App.use(Passport.initialize());

App.use('/api', apiRoutes);

/*
|----------------------------------------------
| Send one index file for angular route mapping
|----------------------------------------------
*/
App.use((req, res) => {
    res.sendFile(Path.join(__dirname, '/public', 'index.html'));
});

App.listen(process.env.APP_PORT, () => {
    console.log(`App running on ${process.env.APP_PORT}`);
});
