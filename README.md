# AdoddaBooking

![Screenshot of Homepage](https://i.imgur.com/nil421f.png)

**Demo**: https://adodda-booking.herokuapp.com/

AdoddaBooking is a friendly hotel booking web-application for everyone to share their place for rent or rent out a place from people around the world. 

# Fullstack Application

I built a Full-stack Application, using MERN Stack (MongoDB, Express, React, Node.js), a framework that have been popular around web-deveopment world.

## Back-End

1. **Express** + **middleware** functions to provide abstract layer on top of NodeJS

2. **MongoDB**: Database set up that allows me to easily and expressively model user info my application.

3. I use **mLab** as my digital database because they offer 500MB free for your storage.

## Front-End

4. **Bootstrap Material Design**: quick, easy set up, mobile responsive for **React** libraries.

5. **React**: a JavaScript library which brings a declarative class driven approach to defining UI components.

6. **Redux**:  an open-source JavaScript library for managing application state

7. **React-Reveal**: high performance animation library for React

8. **Google Maps Javascript API**: an interactive map to your website. Customize it with your own content and imagery.


## Other Technologies

9. **AWS s3**: Amazon storage service that offers industry-leading scalability, data availability, security, and performance.

10. Passport, Nodemon, axios, body-parser etc. -

11. Babel, ES6. Bluebird, because ES 6 is fun and also I believe in clean code (hence promises).


# Getting Started

To get you started you can first clone the repository to your local machine: 

```
$ git clone https://github.com/tinla94/AddodaBooking

```

Also decide whether you will use `yarn` or `npm`.  My preference is `npm` and what the app was built on.  

**Notice**: Run `npm install` on both **server** and **client**.

### Prerequisites

To run, first make sure you have Node installed. You can type `node -v` to find your version:

```
$ node -v 
v11.10.1
```
If you do not have Node installed. You can download from their website: https://nodejs.org/en/download/ or you can install via Homebrew (need to install Homebrew first fo course). Here's a link to a guide: https://www.dyclassroom.com/howto-mac/how-to-install-nodejs-and-npm-on-mac-using-homebrew

You will also need to have mongoDB for database management. I few options for you.

1. Start your local mongodb. Make sure you install mongoDB before starting below command

```
mongod
```

2. You can use **mLab** or **mongoAtlas** for virtual database.

Please look at `package.json` file for all dependencies that you will need to install.  For example you will need *parcel-bundler* which can be installed via npm: 


# Heroku and Deployment

1. Login your heroku

```
heroku login
```

2. Create Heroku 

```
heroku create <github.name><project-name>
```

3. Cofirm heroku

 ``` 
 heroku remote -v
 ```
 
 4. Add files ( same steps as adding to github)
 
 ```
 git add .
 ```
 
 5. Commit all files
 
 ``` 
 git commit -m **"description"**
 ```
 
 6. Update new files to heroku
 
 ```
 git push heroku master
 ```
 
 ### WARNING
 
 Before making your heroku link works, you should add below _command_ to **package.json** on _backend_ side
 
 ```
 "heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix client && npm run build --prefix client"
```

1. **NPM_CONFIG_PRODUCTION=false** to skip prunning step, so you can access packages declared under _devDependencies_.
2. _npm install --prefix client_ will install **client** side to merge with **server** side.
3. _npm run build --prefix client_ build a _build_ folder to make **client** available for **production**.


## Author

* **Cuong La (Tin)** 
