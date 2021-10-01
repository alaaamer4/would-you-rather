## Available Scripts

In the project directory, you can run:

### `npm run client`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run server`

start the server on port 5000 and connect the server to the backend

### `npm start`

runs the client and the server concurrently using concurrently package

## How To Get Started

To get started developing right away:

- install all project dependencies with `npm install` and `npm install --prefix frontend`
- start the development server with `npm start`

## What You're Getting

```bash
     ├──app.js #the entry point of your app
│    ├── README.md - This file.
│    ├── package.json # npm package manager file. It's unlikely that you'll need to modify this.
│    ├── frontend
│    ├── public
│    │       ├── favicon.ico # React Icon, You may change if you wish.
│    │       └── index.html # DO NOT MODIFY
│    └── src
│        ├── App.css # general styles for the routes.
│        ├── App.js # This is the root of your frontend app. Contains static HTML right now.
│        ├── store
│        │    ├──rootReducer.js # the root of our reducers and where we can combine them
│        │    ├──store.js # the configuration of our store
│        │    ├──types.js # variables holding the types which we will be using in our app
│        │    ├── actions
│        │    │    ├── auth.js # actions handling authentications
│        │    │    ├── question.js # actions handling the questions and answers
│        │    ├── dispatch
│        │    │    ├── auth.js # reducer handling authentications
│        │    │    ├── question.js # reducer handling the questions and answers
│        │
│        ├── Routes
│        │    ├──CreateQuestion.js # the ui and logic for creating new question
│        │    ├──Home.js # Home page
│        │    ├──Login.js # login page
│        │    ├──Register.js # login page
│        │    ├──NotFound.js # login page
│        ├── functions # helper functions
│        │    ├──ProtectedRoute.js # functionality allow only auth user to view the component
│        │    ├──setToken.js # check if token and save it in the local storage if not then it's not authenticated
│        ├── component
│        │    ├──Answer.js # answer component to render ui
│        │    ├──Answered.js # wrapper to the answer
│        │    ├──Leadboard.js # handel the users points
│        │    ├──Loading.js # handel the Loading
│        │    ├──Minibar.js # handel the if you go to answered or unanswered
│        │    ├──Navbar.js # navbar Ui
│        │    ├──Question.js # the ui of the question asked
│        │    ├──Select.js # handel which answer you have selected
│        │    ├──Select.js # render the unanswered questions
│        │    ├──Select.js # render the user with his points
│        ├── assets # all images that we need
├── server
    ├── config # app configuration
    ├── middlewares # app middlewares
    ├── model # models for the backend to follow
    ├── routes # the route system

```

## Backend Server

the backend is created with node and mongodb it's very simple and easy to work with

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).
