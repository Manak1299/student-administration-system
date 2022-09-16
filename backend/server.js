import express from 'express';
import dotenv from 'dotenv';
import config from './config';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import userRoute from './routes/userRoutes';
import classRoute from './routes/classRoutes';
import divisionRoute from './routes/divisionRoutes';
import infoformRoute from './routes/infoformRoutes';
import subjectRoute from './routes/subjectRoutes';
const app = express();
app.use(bodyParser.json());
dotenv.config();

const mongodbUrl = config.MONGODB_URL;
mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).catch(error => console.log(error.reason));

app.use("/api/users", userRoute);
app.use("/api/classes", classRoute);
app.use("/api/divisions", divisionRoute);
app.use("/api/studentinfo", infoformRoute);
app.use("/api/subjects",subjectRoute);
app.listen(5000, () => { console.log("Server started at http://localhost:5000") });