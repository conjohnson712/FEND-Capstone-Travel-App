import { calcTripLength } from "../client/js/formHandler";

// dotenv for hiding API_KEY
// Reference: 'Evaluate News Article with NLP' Project in next course
const dotenv = require("dotenv");
dotenv.config({path: ".env"});
var path = require("path");

// Express to run server and routes
// Reference: Lesson 2-4 https://classroom.udacity.com/nanodegrees/nd0011/parts/cd0429/modules/d153872b-b417-4f32-9c77-d809dc21581d/lessons/ls1844/concepts/f9133dcc-e746-4bbe-a5f5-91941535940d
const express = require("express");
const app = express();

/* Dependencies */
// Reference: Lesson 2-4 https://classroom.udacity.com/nanodegrees/nd0011/parts/cd0429/modules/d153872b-b417-4f32-9c77-d809dc21581d/lessons/ls1844/concepts/f9133dcc-e746-4bbe-a5f5-91941535940d
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

/* Middleware*/
// Here we are configuring express to use body-parser as middle-ware.
// Reference: Lesson 2-4 https://classroom.udacity.com/nanodegrees/nd0011/parts/cd0429/modules/d153872b-b417-4f32-9c77-d809dc21581d/lessons/ls1844/concepts/f9133dcc-e746-4bbe-a5f5-91941535940d
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
// Reference: Lesson 2-4 https://classroom.udacity.com/nanodegrees/nd0011/parts/cd0429/modules/d153872b-b417-4f32-9c77-d809dc21581d/lessons/ls1844/concepts/f9133dcc-e746-4bbe-a5f5-91941535940d
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
// Reference: Lesson 2-8: https://classroom.udacity.com/nanodegrees/nd0011/parts/cd0429/modules/d153872b-b417-4f32-9c77-d809dc21581d/lessons/ls1844/concepts/ecf2408b-6ab1-4906-bd28-8348d99bc95d
app.use(express.static("dist"));

app.get('/', function (req, res) {
    res.sendFile("dist/index.html")
});


// Mock API test
const mockAPIResponse = require("./mockAPI");
const { ClientRequest } = require("http");

app.get("/test", function (req, res) {
    res.send(mockAPIResponse)
});

// Callback to debug 
// Spin up the server
// Reference: Lesson 2-8: https://classroom.udacity.com/nanodegrees/nd0011/parts/cd0429/modules/d153872b-b417-4f32-9c77-d809dc21581d/lessons/ls1844/concepts/ecf2408b-6ab1-4906-bd28-8348d99bc95d
const port = 8714;

const listening = () => {
    console.log(`Server running on localhost:${port}`);
    console.log(`key: ${geonamesApiKey}`)
};

const server = app.listen(port, listening);


//---------------- GeoNames API ---------------//

geonamesData = {};


// Personal API Key for Geoname API
const geonamesURL = "http://api.geonames.org/searchJSON?";
const geonamesApiKey = process.env.GEO_API_KEY;


// Initialize Geoname route with a callback function
// Callback function to complete GET '/geonames'
// Reference: Lesson 3-2: https://classroom.udacity.com/nanodegrees/nd0011/parts/cd0429/modules/d153872b-b417-4f32-9c77-d809dc21581d/lessons/ls1845/concepts/b0d68e7d-274a-43ef-b3da-3cfe93a77961
console.log(":: Starting Geo GET request ::");

app.get("/geonames", (req, res)=>{
    console.log(':: Geo GET Successful! ::')
    res.send(geonamesData) 
});


// Geonames Post Route
// References:
// My NLP Project: https://github.com/conjohnson712/Evaluate-Article-with-NLP
// API parameters determined from example API call: http://api.geonames.org/citiesJSON?north=44.1&south=-9.9&east=-22.4&west=55.2&lang=de&username=demo
console.log(":: Starting Geo POST Route ::")

app.post("/geonames", async function (req, res){
    let geonamesApiKey = process.env.GEO_API_KEY;
    let city = req.body.geoData.Destination;
    console.log(`Destination Chosen: ${city}`);
    const fullGeoURL = `${geonamesURL}q=${city}&username=${geonamesApiKey}&fuzzy=0.8&maxRows=1`;
    console.log(fullGeoURL);
    const newData = await fetch(encodeURI(fullGeoURL))
                            .then(res => res.json());
                            
    console.log(newData);
    let geoEntry = {
        location: newData.geonames[0].toponymName, // Used instead of 'name' to avoid spelling errors
        country: newData.geonames[0].countryName,
        lat: newData.geonames[0].lat,
        lng: newData.geonames[0].lng,
        daysToTrip: calcTripLength.daysToTrip, 
        length: calcTripLength.tripLength,
    }
    geonamesData=geoEntry;
    res.send(geonamesData);
    console.log(":: Geo POST Successful! ::");
});

//-------------- WeatherBit API-----------------// 
// let weatherData = {};
// const weatherAPIKey = process.env.WB_API_KEY
// const weatherURL = `https://api.weatherbit.io/v2.0/forecast/daily?`

// app.get("/weatherbit", (req, res)=>{
//     res.send(weatherData);
// });


// // WeatherBit Post Route
// // References:
// // My NLP Project: https://github.com/conjohnson712/Evaluate-Article-with-NLP
// // API parameters determined from example API call: https://www.weatherbit.io/api/weather-current
// app.post("/weatherbit", async function (req, res){
//     const fullweatherURL = `${weatherURL}lat=${geonamesData.geonames[0].lat}&lon=${geonamesData.geonames[0].lng}&key=${weatherAPIKey}`;
//     console.log(fullweatherURL);
//     const newData = await fetch(fullweatherURL)
//                             .then(res => res.json());
                            
//     console.log(newData);

//     let weatherEntry = {
//         Description: newData.weather.description,
//         High: newData.max_temp,
//         Low: newData.low_temp
//     };
//     weatherData=weatherEntry;
//     console.log(weatherData);
//     res.send(weatherData);
// }
// );




// --------------- Pixabay API -----------------// 
// let pixabayData = {};
// const pixabayAPIKey = process.env.PIX_API_KEY
// const pixabayURL = `https://pixabay.com/api/?`;

// app.get("/pixabay", (req, res)=>{
//     res.send(pixabayData);
// });


// // Pixabay Post Route
// // Reference:
// // API parameters determined from example API call: https://pixabay.com/api/docs/
// app.post("/pixabay", async function (req, res){
//     const fullpixabayURL = `${pixabayURL}key=${pixabayAPIKey}&q=${req.body.city}&image_type=photo`;
//     console.log(fullpixabayURL);
//     const newData = await fetch(fullpixabayURL)
//                             .then(res => res.json());
                            
//     console.log(newData);

//     let pixabayEntry = {

//     };
//     pixabayData=pixabayEntry;
//     console.log(pixabayData);
//     res.send(pixabayData);
// }
// );