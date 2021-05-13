import express from 'express';
import mongoose from 'mongoose';
import config from './config';

const app = express()
const { MONGO_URI } = config;

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true
}).then(() => console.log("Mongo DB connect"))
.catch((e) => console.error(e));
app.get('/');

export default app;