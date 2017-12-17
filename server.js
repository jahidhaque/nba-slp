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

const App = Express();

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
