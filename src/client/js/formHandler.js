// Function that handles form submission
// handleSubmit: event -> void
// Reference: 
// My NLP Project: https://github.com/conjohnson712/Evaluate-Article-with-NLP
function handleSubmit(event) {
    event.preventDefault();

    // check what text was put into the form field
    // Function to POST data 
    let city = document.getElementById("city").value;
    let start = document.getElementById("start").value;
    let end = document.getElementById("end").value;
    
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
            verifyDates()
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


// Create a new date instance dynamically with JS
let d = new Date();
const newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

// Create date variables to track trip length
let today = new Date();
let start = new Date(document.getElementById("start").value);
let end = new Date(document.getElementById("end").value);


// Function to Verify that user Dates are compatible
// verifyDates --> today, start, end --> true or alert
const verifyDates = (today, start, end) => {
    // Ensures that start date is in the future
    if (start - today > 0) {
        console.log("Start Date Approved")
        return true;
    } else {
        alert("Departure Date Too Soon, Pick a Future Date")
    };

    // Ensures that the user's trip is within 14 days
    if (end - today < 14) {
        console.log("End Date Approved")
        return true
    } else {
        alert("For Weather Accuracy, Trips Can Only Be Booked Two Weeks Out");
    };

    let tripCountdown = `(${start}-${today}) Days Until Your Adventure!`;
    console.log(tripCountdown)
}; 

verifyDates(today, start, end);


// Function that determines the length of the user's trip
// calcTripLength --> void
const calcTripLength = () => {
    // getTime() returns time in milliseconds
    let tripTimeMs = end.getTime() - start.getTime();
    let msToDays = (1000 * 60 * 60 * 24);

    let tripLength = `Your Trip is (${tripTimeMs}/${msToDays}) Days Long`
    console.log(tripLength)
}

calcTripLength

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
        document.getElementById("city").innerHTML = `City: ${allData.toponymName}`;
        document.getElementById("country").innerHTML = `Country: ${allData.countryName}`;
    }
    catch(error) {
        console.log("error", error);
        // Appropriately handle errors
    };
};

export { handleSubmit, updateUI };