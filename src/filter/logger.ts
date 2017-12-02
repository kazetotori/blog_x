import * as morgan from "morgan";
import * as express from "express";


export const filter = express.Router();
filter.use(morgan('dev'));