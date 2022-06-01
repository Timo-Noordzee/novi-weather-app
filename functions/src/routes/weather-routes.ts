import {Router} from "express";
import {asyncHandler} from "../middleware/async-handler";
import axios from "axios";
import {isAuthenticated} from "../middleware/is-authenticated";

const weatherRouter = Router()

weatherRouter.get(
    "/",
    isAuthenticated,
    asyncHandler(async (req, res) => {
        const {latitude, longitude, lang} = req.query
        const token = process.env.OPEN_WEATHER_TOKEN
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${token}&lang=${lang}`)
        res.status(response.status).send(response.data)
    })
);

export {weatherRouter}
