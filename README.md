# OvernightBooking

![Screenshot of Homepage](https://i.imgur.com/nil421f.png)

**Demo**: https://adodda-booking.herokuapp.com/

AdoddaBooking is a friendly hotel booking web-application for everyone to share their place for rent or rent out a place from people around the world. 

# Fullstack Application

I built a Full-stack Application, using MERN Stack (MongoDB, Express, React, Node.js), a framework that have been popular around web-deveopment world.

## Back-End

1. **Nodejs**: a platform built on Chrome’s JavaScript runtime for easily building fast and scalable network applications. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient, and thus perfect for data-intensive real-time applications that run across distributed devices.

2. **Express.js**: a Node.js framework. You can create the server and server-side code for an application like most of the other web languages but using JavaScript.

3. **MongoDB**: a cross-platform document-oriented database program. Classified as a NoSQL database program, MongoDB uses JSON-like documents with schema. 

4. **Redis**: an open-source (BSD licensed), in-memory data structure store, used as a database, cache, and message broker. It supports data structures such as strings, hashes, lists, sets, sorted sets with range queries, bitmaps, hyperloglogs, and geospatial indexes with radius queries.

5. **PM2**: a production process manager for Node.js applications with a built-in load balancer. It allows you to keep applications alive forever, to reload them without downtime and to facilitate common system admin tasks.


## Front-End

4. **Bootstrap**: a CSS Framework for developing responsive and mobile-first websites.

5. **React**: a JavaScript library for building user interfaces. It is maintained by Facebook and a community of individual developers and companies. React can be used as a base in the development of single-page or mobile applications.

6. **Redux**: an open-source JavaScript library for managing application state. It is most commonly used with libraries such as React or Angular for building user interfaces.

7. **React-Reveal**: a high performance animation library for React.


## Other Technologies

8. **AWS S3**: a service offered by Amazon Web Services that provides object storage through a web service interface.

9. **Google Map API**: a robust tool that can be used to create a custom map, a searchable map, check-in functions, display live data synching with location, plan routes, or create a mashup just to name a few.


# Getting Started

To get you started you can clone the repository to your local machine: 

```
$ git clone https://github.com/tinla94/OvernightBooking

```

### Or

```
Download the repository
```

Also decide whether you will use `yarn` or `npm`.  My preference is `npm` and what the app was built on.  

**For npm**: Run `npm install` on both **server** and **client**.

**For yarn**: Run `yarn add` on both **server** and **client**.

### Prerequisites

To run, first make sure you have Node installed. You can type `node -v` to find your version:

```
$ node -v 
v13.5.0
```

If you do not have Node installed. You can download from their website: https://nodejs.org/en/download/ or you can install via Homebrew (need to install Homebrew first fo course). Here's a link to a guide: https://www.dyclassroom.com/howto-mac/how-to-install-nodejs-and-npm-on-mac-using-homebrew

You will also need to have mongoDB for database management. I few options for you.

1. Start your local mongodb. Make sure you install mongoDB before starting below command

```
mongod
```

2. You can use **MongoAtlas** for virtual database.

Please look at `package.json` file for all dependencies that you will need to install.  For example you will need *parcel-bundler* which can be installed via npm.


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
