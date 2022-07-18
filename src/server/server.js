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
};

const server = app.listen(port, listening);

//---------------- GeoNames API ---------------//
let projectData = {};


// Initialize Geoname route with a callback function
// Callback function to complete GET '/apiChain'
// Reference: Lesson 3-2: https://classroom.udacity.com/nanodegrees/nd0011/parts/cd0429/modules/d153872b-b417-4f32-9c77-d809dc21581d/lessons/ls1845/concepts/b0d68e7d-274a-43ef-b3da-3cfe93a77961
console.log(":: Starting Geo GET request ::");

app.get("/apiChain", (req, res)=>{
    console.log(':: Geo GET Successful! ::')
    res.send(allData) 
});

// Geonames Post Route
// References:
// My NLP Project: https://github.com/conjohnson712/Evaluate-Article-with-NLP
// API parameters determined from example API call: http://api.geonames.org/citiesJSON?north=44.1&south=-9.9&east=-22.4&west=55.2&lang=de&username=demo
console.log(":: Starting Geo POST Route ::")

app.post("/apiChain", async function (req, res){
    geonamesData = {};

    // Personal API Key for Geoname API
    let geonamesApiKey = process.env.GEO_API_KEY;
    console.log(`key: ${geonamesApiKey}`)

    // Get city value from user input
    let city = req.body.geoData.Destination;
    console.log(`Destination Chosen: ${city}`);

    // Define and fetch Geonames URL
    const geonamesURL = "http://api.geonames.org/searchJSON?";
    const fullGeoURL = `${geonamesURL}q=${city}&username=${geonamesApiKey}&fuzzy=0.8&maxRows=1`;
    console.log(fullGeoURL);
    const newData = await fetch(encodeURI(fullGeoURL))
                            .then(res => res.json());       
    console.log(newData);

    // Create object to store Geonames data
    let geoEntry = {
        location: newData.geonames[0].toponymName, // Used instead of 'name' to avoid spelling errors
        country: newData.geonames[0].countryName,
        lat: newData.geonames[0].lat,
        lng: newData.geonames[0].lng,
    }
    geonamesData=geoEntry;
    console.log(":: Geo POST Successful! ::");

    //-------------- WeatherBit API-----------------// 

    // Personal API Key for Weatherbit API
    let weatherData = {};
    const weatherAPIKey = process.env.WB_API_KEY
    const weatherURL = `https://api.weatherbit.io/v2.0/forecast/daily?`

    // WeatherBit Post Route
    // References:
    // My NLP Project: https://github.com/conjohnson712/Evaluate-Article-with-NLP
    // API parameters determined from example API call: https://www.weatherbit.io/api/weather-current
    const fullweatherURL = `${weatherURL}lat=${geonamesData.lat}&lon=${geonamesData.lng}&key=${weatherAPIKey}`;
    console.log(fullweatherURL);
    const wbData = await fetch(fullweatherURL)
                            .then(res => res.json());
                            
    console.log(wbData);

    // Create object to store Weatherbit data
    let weatherEntry = {
        description: wbData.data[0].weather.description,
        high: wbData.data[0].high_temp,
        low: wbData.data[0].low_temp
    };
    weatherData=weatherEntry;
    console.log(weatherData);

    console.log(":: Weather POST Successful ::")

    //--------------- Pixabay API -----------------// 

    // Personal API Key for Pixabay API
    let pixabayData = {};
    const pixabayAPIKey = process.env.PIX_API_KEY
    const pixabayURL = `https://pixabay.com/api/?`;

    // Default Pixabay URL in case there are no results
    //const defaultPixURL = `${pixabayURL}key=${pixabayAPIKey}&q=${geonamesData.country}&image_type=photo`;
    // console.log(defaultPixURL)
   

    // Pixabay Post Route
    // Reference:
    // API parameters determined from example API call: https://pixabay.com/api/docs/
    const fullpixabayURL = `${pixabayURL}key=${pixabayAPIKey}&q=${geonamesData.location}&image_type=photo`;
    console.log(fullpixabayURL);
    const pixData = await fetch(fullpixabayURL)
                            .then(res => res.json());
                        
    console.log(pixData);

    // Create object to store Pixabay data
    // let pixabayEntry = {
    //     photo: pixData.hits[0].webformatURL
    // };

    // pixabayData=pixabayEntry;
    // console.log(pixabayData);


    // Combine All APIs into one object to send Client-side (Only way I found to avoid Promise chaining errors)
    let location = geonamesData.location;
    let country = geonamesData.country;
    let lat = geonamesData.lat;
    let lng = geonamesData.lng;
    let description = weatherData.description;
    let high = weatherData.high;
    let low = weatherData.low;

    // Suggestion from my Auticon Mentor
    // Displays default image if Pixabay doesn't have any results for the location
    let photoURL = {}
        if (pixData.totalHits == 0){
            photoURL = "https://cdn.pixabay.com/photo/2016/01/09/18/28/notepad-1130743_960_720.jpg";
         } else {
            photoURL = pixData.hits[0].webformatURL;
        }

    // Create allData object to store info to be pushed to client
    allData = {
        location,
        country, 
        lat,
        lng,
        description,
        high,
        low,
        photoURL
    };

    try {
    console.log("allData:", allData);
    res.send(allData);
    console.log(":: All APIs Successful ::")
    } catch (error) {
        alert(":: ERROR: Post Route Unsuccessful ::")
    }
});