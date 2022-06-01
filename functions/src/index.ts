import * as admin from 'firebase-admin'
import {firebaseAuthMiddleware} from "./middleware/firebase_auth_middleware";
import {weatherRouter} from "./routes/weather-routes";
import {exceptionHandler} from "./middleware/exception-handler";
import {region} from "firebase-functions";
import bodyParser = require('body-parser');
import cors = require('cors');
import express = require('express');

admin.initializeApp()

const app = express();
app.use(cors({origin: true}));
app.use(bodyParser.json());
app.use(firebaseAuthMiddleware)

app.use("/weather", weatherRouter);

app.use(exceptionHandler);

exports.api = region('europe-west1').https.onRequest(app);
