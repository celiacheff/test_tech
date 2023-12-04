import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import 'reflect-metadata';
import {productRoute} from "./products/web/products.route";
import {ErrorMiddleware} from "./core/middlewares/error.middleware";

const app = express()
app.use(cors());
app.use(hpp());
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use('/products', productRoute)
app.use(ErrorMiddleware)

export default app;
