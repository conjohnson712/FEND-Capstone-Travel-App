// cityChecker: inputText --> void
// Checks to ensure that the URL input is valid using regex
// References: 
// https://www.geeksforgeeks.org/check-if-an-url-is-valid-or-not-using-regular-expression/
// My NLP Project: https://github.com/conjohnson712/Evaluate-Article-with-NLP
function checkForCity() {
    console.log("::: Running checkForName :::");
    const city = document.getElementById('city').value

    if(city == null) {
        alert("Please Enter a Valid City")
    } else {
        return true;
    };
};

export { checkForCity };