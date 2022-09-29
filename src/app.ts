import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import helmet from 'helmet';
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var errorhandler = require('errorhandler');

dotenv.config();
const port = process.env.PORT;
const env = process.env.NODE_ENV;

const app: Express = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/static', express.static(path.join(__dirname, 'public')));

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

if (env === 'development') {
  // only use in development
  app.use(errorhandler());
}

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port} in ${env}`);
});
