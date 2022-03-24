/* Global Variables */

// Personal API Key for OpenWeatherMap API
// References: 
// Lesson 4-6: https://classroom.udacity.com/nanodegrees/nd0011/parts/cd0429/modules/d153872b-b417-4f32-9c77-d809dc21581d/lessons/ls1846/concepts/211c2a41-4ab7-48ea-94cc-b44b2e4363c4
// Knowledge Post: https://knowledge.udacity.com/questions/771226
let baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
let apiKey ="a29269f9dfa285042b1085ced6cbfb7b&units=imperial";


// Create a new date instance dynamically with JS
// Part of starter code
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Event listener to add function to existing HTML DOM element
// Lesson 4-6: https://classroom.udacity.com/nanodegrees/nd0011/parts/cd0429/modules/d153872b-b417-4f32-9c77-d809dc21581d/lessons/ls1846/concepts/211c2a41-4ab7-48ea-94cc-b44b2e4363c4
document.getElementById("generate").addEventListener("click", generateJournal);


/* Function called by event listener */
// Reference: Lesson 4-6: https://classroom.udacity.com/nanodegrees/nd0011/parts/cd0429/modules/d153872b-b417-4f32-9c77-d809dc21581d/lessons/ls1846/concepts/211c2a41-4ab7-48ea-94cc-b44b2e4363c4
// generateJournal: element --> void
// Gets and assigns values needed to generate a journal entry.
// Calls upon the getWeatherData function
const generateJournal = (e) => {
    const zipCode = document.getElementById("zip").value;
    const feelings = document.getElementById("feelings").value;
    console.log(newDate);
    getWeatherData(baseURL, zipCode, apiKey)
}

/* Function to GET Web API Data*/
// Reference: Lesson 4-6: https://classroom.udacity.com/nanodegrees/nd0011/parts/cd0429/modules/d153872b-b417-4f32-9c77-d809dc21581d/lessons/ls1846/concepts/211c2a41-4ab7-48ea-94cc-b44b2e4363c4
// getWeatherData: baseURL, zipCode, feelings, apiKey --> void
// Async function that fetches the URL and necessary data and logs it
const getWeatherData = async (baseURL, zipCode, apiKey) =>{
    const res = await fetch(baseURL+zipCode+apiKey)
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
const retrieveData = async () =>{
    const request = await fetch("/all");
    try {
        // Transform into JSON
        const allData = await request.json()
        console.log(allData)
        // Write updated data to DOM Elements
        document.getElementById("temp").innerHTML = Math.round (allData.temp)+ "degrees";
        document.getElementById("content").innerHTML = allData.feel;
        document.getElementById("date").innerHTML = allData.date;
    }
    catch(error) {
        console.log("error", error);
        // Appropriately handle the error
    }
}