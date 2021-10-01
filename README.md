# offline-budget-tracker

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

![JS](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)

![mongoDB](https://img.shields.io/badge/mongodb-white?style=for-the-badge&logo=mongodb&logoColor=47A248)
![Mongoose](https://img.shields.io/badge/mongoose-800?style=for-the-badge&logo=mongoose&logoColor=white)

## <h2 id="description"> Description </h2>

A web application that allows user to keep track of their personal budget, even when there is no network connection. A user can record their spendings, which will be updated when the browser reconnects to the internet. 

In this task, a full project was already provided. The offline recording functionality is needed to be added. The final application is deployed on Heroku.

### <h3 id="preview"> Preview </h3>

The end product should resemble the mock-up provided below:

[![budget tracker screenshot](./demo/screenshot.png)](https://supa-budget-tracker.herokuapp.com)


## <h2 id="table-of-contents"> Table of Contents </h2>

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)


## <h2 id="installation"> Installation </h2>
[(Back to top)](#table-of-content)

If you would like to work on a copy of this web application, you can follow these steps to set it up.


### Step 1: Load and install all dependencies

To use this project, first clone the repo on your device using the commands below:

    git clone https://github.com/Supasiti/offline-budget-tracker.git

Then install all the required libraries by running the follow command

    npm i 


### Step 2: Setting up MongoDB on Mongo Atlas

After installing all the dependencies, you would need to set up Mongo database. An instruction on how to set it up on Mongo Atlas can be found [here](https://www.mongodb.com). After setting up Mongo Atlas, you would need to set up your local environment variables. On the root folder, create and open `.env` file:

    offline-budget-tracker> touch .env
    offline-budget-tracker> open .env

In the `.env` file, enter all the following details:

    MONGODB_URI=mongodb+srv....

### Step 3: Setting up Webpack

The client JavaScript was built using Webpack. All the development code can be found in `./src/` folder. You can run the following command to add any additional development dependencies:

    npm i -D

and the following command to build a bundle

    npm run webpack


## <h2 id="usage"> Usage </h2>
[(Back to top)](#table-of-content)

The access point for the appliction is in the main folder. You can start a local server locally by the following commands:

    cd ~/pathTo/offline-budget-tracker
    npm start

The main application is deployed in Heroku, [here](https://supa-budget-tracker.herokuapp.com) 


## <h2 id="license"> License </h2>
[(Back to top)](#table-of-content)

Licensed under the [MIT](https://opensource.org/licenses/MIT) license.