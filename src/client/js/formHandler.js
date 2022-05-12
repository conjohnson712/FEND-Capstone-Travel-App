/* Global Variables */
const geonamesApiKey = process.env.GEO_API_KEY;
const fetch = require('node-fetch');
// Create a new date instance dynamically with JS
// Part of starter code
let d = new Date();
const newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

// Function that handles form submission
// handleSubmit: event -> void
// Reference: 
// My NLP Project: https://github.com/conjohnson712/Evaluate-Article-with-NLP
function handleSubmit(event) {
    event.preventDefault()
    

    // check what text was put into the form field
    // Function to POST data 
    let city = document.getElementById('city').value
    if (Client.checkForCity(city)){
        console.log("::: Form Submitted :::");
        fetch('http://localhost:8713/geonames', {
            method: "POST",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
        },
        body: JSON.stringify({ city: city }), // body data type must match "Content-Type" header
    })
    .then(res => res.json())
    .then(function(res) {
        updateUI(res)
    });
    } else {
        alert('Submission Failed')
    };
};

// Event Listener to start handleSubmit on Click
// If statement added to pass Jest
// Reference: https://stackoverflow.com/questions/26107125/cannot-read-property-addeventlistener-of-null
let submit = document.getElementById("submit");
if(submit){
    submit.addEventListener("click", handleSubmit);
};
// updateUI: async --> void
// Function to update UI with NLP results
// Reference: 
// My NLP Project: https://github.com/conjohnson712/Evaluate-Article-with-NLP
const updateUI = async () => {
    
    const request = await fetch('http://localhost:8713/geonames');
    try {
        // Transform into JSON
        const allData = await request.json();
        console.log(allData);
        // Write updated data to DOM elements
        document.getElementById('lat').innerHTML = `Latitude: ${allData.lat}`;
        document.getElementById('lng').innerHTML = `Longitude: ${allData.lng}`;
        document.getElementById('city').innerHTML = `City: ${allData.toponymName}`;
        document.getElementById('country').innerHTML = `Country: ${allData.countryCode}`;
        document.getElementById('wikipedia').innerHTML = `Wikipedia: ${allData.wikipedia}`;
    }
    catch(error) {
        console.log('error', error);
        // Appropriately handle errors
    };
};

export { handleSubmit, updateUI };