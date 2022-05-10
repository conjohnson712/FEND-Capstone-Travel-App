// dotenv for hiding API_KEY
// Reference: 'Evaluate News Article with NLP' Project in next course
const dotenv = require('dotenv');
dotenv.config({path: '.env'});

var path = require('path');

// Express to run server and routes
// Reference: Lesson 2-4 https://classroom.udacity.com/nanodegrees/nd0011/parts/cd0429/modules/d153872b-b417-4f32-9c77-d809dc21581d/lessons/ls1844/concepts/f9133dcc-e746-4bbe-a5f5-91941535940d
const express = require("express");

// Start up an instance of app
// Reference: Lesson 2-4 https://classroom.udacity.com/nanodegrees/nd0011/parts/cd0429/modules/d153872b-b417-4f32-9c77-d809dc21581d/lessons/ls1844/concepts/f9133dcc-e746-4bbe-a5f5-91941535940d
const app = express();

/* Dependencies */
// Reference: Lesson 2-4 https://classroom.udacity.com/nanodegrees/nd0011/parts/cd0429/modules/d153872b-b417-4f32-9c77-d809dc21581d/lessons/ls1844/concepts/f9133dcc-e746-4bbe-a5f5-91941535940d
const bodyParser = require("body-parser")

const fetch = require('node-fetch');

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
    res.sendFile('./dist/index.html')
});

// Callback to debug 
// Spin up the server
// Reference: Lesson 2-8: https://classroom.udacity.com/nanodegrees/nd0011/parts/cd0429/modules/d153872b-b417-4f32-9c77-d809dc21581d/lessons/ls1844/concepts/ecf2408b-6ab1-4906-bd28-8348d99bc95d
// According to Node error code, listening() had to be put before server.
const port = 8713;

const server = app.listen(8713, function(){
    console.log(`server running on localhost: ${port}`);
});


//---------------- GeoNames API ---------------//


// Personal API Key for Geoname API
// References: 
// Lesson 4-6: https://classroom.udacity.com/nanodegrees/nd0011/parts/cd0429/modules/d153872b-b417-4f32-9c77-d809dc21581d/lessons/ls1846/concepts/211c2a41-4ab7-48ea-94cc-b44b2e4363c4
// Knowledge Post: https://knowledge.udacity.com/questions/771226
const geonamesURL = `http://api.geonames.org/searchJSON?q=`;
const geonamesApiKey = process.env.GEO_API_KEY

// Initialize Geoname route with a callback function
// Callback function to complete GET '/geonames'
// Reference: Lesson 3-2: https://classroom.udacity.com/nanodegrees/nd0011/parts/cd0429/modules/d153872b-b417-4f32-9c77-d809dc21581d/lessons/ls1845/concepts/b0d68e7d-274a-43ef-b3da-3cfe93a77961
let geonamesData = {};

app.get("/geonames", (req, res)=>{
    res.send(geonamesData);
});


// Geonames Post Route
// References:
// My NLP Project: https://github.com/conjohnson712/Evaluate-Article-with-NLP
// API parameters determined from example API call: http://api.geonames.org/citiesJSON?north=44.1&south=-9.9&east=-22.4&west=55.2&lang=de&username=demo
app.post("/geonames", async function (req, res){
    const fullGeoURL = `${geonamesURL}${req.body.city}&fuzzy=0.7&maxRows=1&username=${geonamesApiKey}`;
    console.log(fullGeoURL);
    const newData = await fetch(encodeURI(fullGeoURL))
                            .then(res => res.json());
                            
    console.log(newData);

    let geoEntry = {
        lat: newData.geonames[0].lat,
        lng: newData.geonames[0].lng,
        city: newData.geonames[0].toponymName, // Used instead of 'name' to avoid spelling errors
        country: newData.geonames[0].countrycode,
        wikipedia: newData.geonames[0].wikipedia,       
    };
    geonamesData=geoEntry;
    console.log(geonamesData);
    res.send(geonamesData);
}
);


//-------------- WeatherBit API-----------------// 
// let weatherbitData = {};


