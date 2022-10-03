import express, { Express } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import helmet from 'helmet';
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var errorhandler = require('errorhandler');

import { AppRoute } from './app.routing';

dotenv.config();
const port = process.env.PORT;
const env = process.env.NODE_ENV;

const app: Express = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/static', express.static(path.join(__dirname, '../public')));

const route: AppRoute = new AppRoute();
app.use(route.router);

if (env === 'development') {
  // only use in development
  app.use(errorhandler());
}

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port} in ${env}`);
});
