/* Global Variables */

// Create a new date instance dynamically with JS
// Part of starter code
let d = new Date();
const newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

/* Function called by event listener */
// References: 
// Lesson 4-6: https://classroom.udacity.com/nanodegrees/nd0011/parts/cd0429/modules/d153872b-b417-4f32-9c77-d809dc21581d/lessons/ls1846/concepts/211c2a41-4ab7-48ea-94cc-b44b2e4363c4
// Lesson 4-10: https://classroom.udacity.com/nanodegrees/nd0011/parts/cd0429/modules/d153872b-b417-4f32-9c77-d809dc21581d/lessons/ls1846/concepts/06b6f9e9-221f-4668-8d13-a70346b293d2
// generateGeoname: element --> void
// Gets and assigns values needed to generate a journal entry (city).
// Calls the getCityInfo function
const generateGeoname = () => {

    let city = document.getElementById("city").value;

    console.log(newDate);
    getCityInfo(geonameURL, city, apiKey)
    .then(function(data){
        // Add data
        console.log(data);
        postData("http://localhost:8713/geonames", {city: data.name, temp: data.main.temp, date: newDate, content: feelings})
    })
        .then(function(){
            updateUI()
        })
    };

// Event listener to add function to existing HTML DOM element
// This was put after generateGeoname to satisfy DOM error code
// Lesson 4-6: https://classroom.udacity.com/nanodegrees/nd0011/parts/cd0429/modules/d153872b-b417-4f32-9c77-d809dc21581d/lessons/ls1846/concepts/211c2a41-4ab7-48ea-94cc-b44b2e4363c4
let submit = document.getElementById("submit");
if(submit){
    submit.addEventListener("click", generateGeoname);
};

/* Function to GET Geoname API Data*/
// Reference: Lesson 4-6: https://classroom.udacity.com/nanodegrees/nd0011/parts/cd0429/modules/d153872b-b417-4f32-9c77-d809dc21581d/lessons/ls1846/concepts/211c2a41-4ab7-48ea-94cc-b44b2e4363c4
// getCityInfo: geonameURL, city, apiKey --> void
// Async function that fetches the URL and necessary data and logs it
const getCityInfo = async (geonameURL, city, apiKey) =>{
    const res = await fetch(geonameURL+zipCode+",us"+apiKey)
    try {
        const data = await res.json();
        console.log(data)
        return data;
    } catch(error) {
        console.log("error", error)
    }
};

/* Function to POST data */
// Reference: Lesson 4-11: https://classroom.udacity.com/nanodegrees/nd0011/parts/cd0429/modules/d153872b-b417-4f32-9c77-d809dc21581d/lessons/ls1846/concepts/9e29ea8c-f587-4e11-9c4a-e2671c23e4e8
const postData = async ( url ="", data = {}) =>{
    const response = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    });

    try {
        const newData = await response.json();
        return newData;
    } catch(error) {
        console.log("error", error);
    }
};

/* Function to GET Project Data */
// Reference: Rubric, 'Dynamically Update UI': https://review.udacity.com/#!/rubrics/4671/view
const updateUI = async () =>{
    const request = await fetch("http://localhost:8712/weatherData");
    try {
        // Transform into JSON
        const allData = await request.json()
        console.log(allData)
        // Write updated data to DOM Elements
        document.getElementById("temp").innerHTML = Math.round(allData.temp)+ " Degrees Fahrenheit";
        document.getElementById("content").innerHTML = allData.content;
        document.getElementById("date").innerHTML = allData.date;
    }
    catch(error) {
        console.log("error", error);
        // Appropriately handle the error
    }
}