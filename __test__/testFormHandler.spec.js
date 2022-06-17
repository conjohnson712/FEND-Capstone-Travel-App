/**
* @jest-environment jsdom
*/
import { handleSubmit } from "../src/client/js/formHandler";
import { updateUI } from "../src/client/js/formHandler";

// The describe() function takes two arguments - a string description, and a test suite as a callback function.  
describe("Testing the submit functionality", () => {
    // The test() function has two arguments - a string description, and an actual test as a callback function.  
    test("Testing the handleSubmit() function", async () => {
           // Define the input for the function, if any, in the form of variables/array
           // Define the expected output, if any, in the form of variables/array
          expect(handleSubmit).toBeDefined();
    });
});



// The describe() function takes two arguments - a string description, and a test suite as a callback function.     
describe("Testing the UI functionality", () => {
    // The test() function has two arguments - a string description, and an actual test as a callback function.  
    test("Testing the updateUI() function", () => {
           // Define the input for the function, if any, in the form of variables/array
           // Define the expected output, if any, in the form of variables/array
           expect(updateUI).toBeDefined();
})});

