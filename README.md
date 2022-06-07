# Capstone Travel App

## Overview
This Travel App serves as the final project for Udacity's Front-End Web-Developer Nanodegree and is a demonstration of the cumulative information learned over the length of 4 courses and 4 projects. This application utilizes 3 different API's: 
1. **Geonames:** http://www.geonames.org/export/web-services.html
2. **WeatherBit:** https://www.weatherbit.io/account/create
3. **Pixabay:** https://pixabay.com/api/docs/

The combination of these three APIs, which work in tandem, provide the user with geo-positioning data for their chosen location, weather data for their specified travel time frame, and an image of the location they are planning to travel to. 

The starter code for this project was a combination of 'Project 3: Weather Journal App' and 'Project 4: Evaluate A News Article With NLP', both of which can be found within my Github repo. Starter codes and instructions for both of these projects was provided by Udacity.com. 

## Instructions
To use this project on your own machine, either clone the repo through github or download the ZIP file through the green 'Code' button.

For this project, dependencies are a big concern for local functionality on your machine. All required dependencies and their compatible versions can be found in the 'package.json' file. Be sure that you have Node version 14 installed on your machine, as older versions of node are not compatible with this project's dependencies. Once you have node v.14 installed, follow these steps to install dependencies:

1. Open a terminal and cd into your project folder
2. Enter the following command to install compatible versions of the packages: 
```
npm i --legacy-peer-deps
```
3. Go to the Geonames link above and create an account so you can get your API KEY. Your Geonames API Key will be the username that you used to create the account.
4. Create a .env file in your root directory. Store your API KEY in .env as follows: 
```
GEO_API_KEY=your-api-key
```
5.  Go to the WeatherBit Link above and create an account so you can receive the API KEY. The API key for WeatherBit will be a string of characters clearly marked on your account. 
6.  In your .env file, enter the following: 
```
WB_API_KEY=your-api-key
```
7. Go to the Pixabay Link above and create an account so you can receive the API KEY. The API KEY for Pixabay will be a string of characters that is clearly marked on the documents page once created.
8. Go back into your .env file one last time and enter the following: 
```
PIX_API_KEY=your-api-key
```
9.  In your terminal, enter: 
```
npm run build
```
10. In the terminal, enter: 
```
npm run start
```
11. Open a second terminal, cd into your project folder again, and enter:
```
npm run dev
```
12. At this point, the webpage should automatically load in your browser. If not, enter the following URL into your search bar and it should come up:
```
http://localhost:8714/
```
PLEASE NOTE: This project was confirmed to run on Google Chrome and a private window in Firefox. If you use another browser and experience difficulties, please try the project on Chrome. 

13. Now the Travel App should be ready for your input! Enter a destination, start, and end date to book your next trip! Note: for accurate weather results, trips should be kept to a maximum of 14 days. 


## Extras
Testing Suites have been introduced to ensure proper operation of necessary functions. To run these tests to compare with your own machine, simply open your terminal, cd to the project folder, and enter: 
```
npm run test
``` 

