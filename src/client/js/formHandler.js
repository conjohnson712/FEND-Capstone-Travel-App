// Function that handles form submission
// handleSubmit: event -> void
// Reference: 
// My NLP Project: https://github.com/conjohnson712/Evaluate-Article-with-NLP
function handleSubmit(event) {
    event.preventDefault();

    // check what text was put into the form field
    // Function to POST data 
    let city = document.getElementById("city").value;
    // let start = document.getElementById("start").value;
    // let end = document.getElementById("end").value;
    
    let geoData = {
        "Destination": city,
    }; //Departure: departDate, Return: returnDate,

    if (Client.checkForCity(city)){
        console.log("::: Form Submitted :::");
        const getGeo = fetch("http://localhost:8714/geonames", {
            method: "POST",
            mode: "cors",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
            },
            body: JSON.stringify({geoData}), // body data type must match "Content-Type" header
        })
        .then(res => res.json())
        .then(function(res) {
            calcTripLength()
            updateUI(res)
            console.log(geoData)
        });
    } else {
        alert("Submission Failed")
    };
};


// Event Listener to start handleSubmit on Click
// If statement added to pass Jest
// Reference: https://stackoverflow.com/questions/26107125/cannot-read-property-addeventlistener-of-null
let submit = document.getElementById("submit");
if(submit){
    submit.addEventListener("click", handleSubmit);
};


// Function that determines the length of the user's trip
// calcTripLength --> string
const calcTripLength = () => {
    // Create a new date instance dynamically with JS
    // Reference: https://phoenixnap.com/kb/how-to-get-the-current-date-and-time-javascript
    let today = new Date();
    const newDate = today.getMonth()+1+'.'+ today.getDate()+'.'+ today.getFullYear();
    console.log(`Today is ${today}`)
    
    // Create date variables to track trip length
    // Reference: https://www.geeksforgeeks.org/how-to-calculate-the-number-of-days-between-two-dates-in-javascript/
    let start = new Date(document.getElementById("start").value);
    let end = new Date(document.getElementById("end").value);
    console.log(`Start: ${start} End: ${end}`);

    // getTime() returns time in milliseconds
    let tripTimeMs = (end.getTime() - start.getTime());
    let msToDays = (1000 * 60 * 60 * 24);

    // Days until trip starts
    let timeToTrip = (start.getTime() - today.getTime());
    let daysToTrip = Math.ceil(timeToTrip / msToDays);

    // if (daysToTrip > 0) {
    //     console.log(`Your Trip Is ${daysToTrip} Days Away!`);
    //     return true
    // } else {
    //     alert("Start date must be at least 1 day away");
    // }

    // Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/ceil
    let tripLength = Math.ceil(tripTimeMs / msToDays);

    if (tripLength > 0 && tripLength < 14 && daysToTrip > 0) {
        return `Your Trip Is ${tripLength} Days Long And Starts In ${daysToTrip} Days!`

    } else {
        alert("IMPORTANT NOTICE FOR USER: Your trip must be between 1 and 14 days in the future to ensure weather accuracy");
    };
}


// updateUI: async --> void
// Function to update UI with NLP results
// Reference: 
// My NLP Project: https://github.com/conjohnson712/Evaluate-Article-with-NLP
const updateUI = async () => {
    const request = await fetch("http://localhost:8714/geonames");
    try {
        // Transform into JSON
        const allData = await request.json();
        console.log(allData);
        // Write updated data to DOM elements
        document.getElementById("lat").innerHTML = `Latitude: ${allData.lat}`;
        document.getElementById("lng").innerHTML = `Longitude: ${allData.lng}`;
        document.getElementById("location").innerHTML = `Location: ${allData.location}`;
        document.getElementById("country").innerHTML = `Country: ${allData.country}`;;
        document.getElementById("length").innerHTML = `${calcTripLength()}`;
    }
    catch(error) {
        console.log("error", error);
        // Appropriately handle errors
    };
};

export { handleSubmit, updateUI };