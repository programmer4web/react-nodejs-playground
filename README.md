# React Nodejs Playground
[![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://opensource.org/licenses/MIT)

## This project is based on
https://github.com/adnanrahic/nodejs-restful-api
https://github.com/temilaj/react-webpack-starter

## Features
+ ES6 and greater => ES5 code transpiling (with Babel)
+ Styling with SASS
+ File bundling with webpack
+ local development with the webpack development server

## Pages
FeaturedProducts, Departments
## Components: 
CustomButton, FeaturedProducts, Product, Profile, TextField, Wishlist.
Menu, Header, Footer, Modal, Notification.

## Requirements
To run this project, you’ll need to install [node 5 and above](https://nodejs.org/en/). The latest version of Node.js is recommended. 

The dependencies of this project are managed with yarn (see installation guide [here](https://yarnpkg.com/en/)). However you can simply use the node package manager, npm for your dependency management.

## Setting up
+ Clone this project to any folder on your local machine
```bash
git clone https://github.com/programmer4web/react-nodejs-playground.git <FOLDER_NAME_HERE>
```
+ Navigate into the folder name specified
```bash
cd <FOLDER_NAME_HERE>
```

then navigate in 'react-nodejs-playground' and install packages, do the same for 'views' folder as views are separated.

## Installing Packages
+ For those who love yarn
```bash 
yarn install
```

+ For those who love NPM
```bash 
npm install
```

## Runnning the bundle

```bash
 yarn build
```

or 

```bash
 npm run build
```
## Runing the nodejs-api
cd nodejs-restful-api
Run yarn run start

 Navigate to [http://127.0.0.1:7070/](http://127.0.0.1:7070). 


## Running the Views in Development

Run `npm start` to intialize and run the webpack development server. Navigate to [http://127.0.0.1:3000/](http://127.0.0.1:3000). 
The app will automatically reload if you change any of the source files.

## Running the app in Production

To run the app in production build of the app, use either of the following.

```bash
 yarn start
```
or
```bash
 npm start
```

## LICENSE

#### [MIT](./LICENSE)