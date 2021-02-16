# Backend-API-Workshop - Jam for Change

### ICS Student Council x Commit the change

## Goals

- Concepts
  - APIs
  - GET/POST/DELETE HTTP requests
  - HTTP codes
  - JSON
  - Document-based NoSQL
  - Environment variables
- Tech
  - Node, Express
  - Mongoose, MongoDB
  - Postman

## Not Goals

- Coding best practices
- One-liner cool hax tricks
- All the weird nuanaces of JavaScript

## Prerequisites for the workshop

- [Git](https://git-scm.com/downloads)
- [VSCode](https://code.visualstudio.com/)
- [Node v14](https://nodejs.org/en/download/)
- [Postman](https://www.postman.com/downloads/)
  - Don’t need make an account
- [Make a MongoDB account](https://www.mongodb.com/cloud/atlas/register)
- MongoDB Compass (~140 MB)
  - [Windows](https://downloads.mongodb.com/compass/mongodb-compass-1.25.0-win32-x64.exe)
  - [MacOs](https://downloads.mongodb.com/compass/mongodb-compass-1.25.0-darwin-x64.dmg)

## Why you should care about API

- Wanna authenticate with google? [API](https://developers.google.com/identity/protocols/oauth2)
- Wanna get yelp data to show in your app? [API](https://www.yelp.com/fusion)
- Wanna add paypal/credit card payment? [API](https://developer.paypal.com/docs/api/overview/)
- Wanna have a pokedex on demand? [API](https://pokeapi.co/)
- Wanna get a job? [API](https://www.glowtouch.com/importance-apis-business/#:~:text=APIs%2C%20or%20application%20program%20interfaces,programs%20are%20able%20to%20communicate.)

## Postman is kool

![](./assets/dogapi.gif)

- Random Dogs API: [https://dog.ceo/api/breeds/image/random](https://dog.ceo/api/breeds/image/random)
- Dummy Data API: [http://dummy.restapiexample.com/api/v1/employees](http://dummy.restapiexample.com/api/v1/employees)
- Retrofitting RMP and Webreg API: [https://anteaterdeclassified.azurewebsites.net/api/RMPSummary?course=I%26C%20SCI%2033&instructor=Pattis,%20R.](https://anteaterdeclassified.azurewebsites.net/api/RMPSummary?course=I%26C%20SCI%2033&instructor=Pattis,%20R.)
- Pokedex: [https://pokeapi.co/api/v2/pokemon/pikachu](https://pokeapi.co/api/v2/pokemon/pikachu)
- HTTP Codes
  - 200: OK
  - 400: Client related errors
  - 500: Internal Server Error

## How do APIs work???

![](./assets/api.png)

- Frontend/client -> backend endpoint server -> data source
- Postman -> Node+Express -> MongoDB
- Angular -> Python+Flask -> MySQL
- Postman -> Dog api -> ???
- React -> Azure functions -> RMP endpoint server -> ???
- RAW html/Javascript -> AWS API Gateway w/ GraphQL -> AWS lambda -> AWS DynamoDB

## What we’re going to make

- Backend of a [LinkTree](httsp://linktr.ee) Clone
  - Allow you to create a page of links
  - Allow you to get a page of links
  - Allow you to delete a page of links
  - Allow you to add a link to a page
  - Allow you to delete a link in a page
- Tech stack
  - Backend endpoint server: Node+Express
  - Database: MongoDB

# Node + Express

- Creating a new project

  ```
  mkdir backend-workshop
  cd backend-workshop
  npm init  # when prompted, press enter a bigglion times
  ```

  - What is this `package.json`?
    ```
    {
      "name": "backend-workshop",
      "version": "1.0.0",
      "description": "",
      "main": "index.js",
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
      },
      "author": "",
      "license": "ISC",
      "dependencies": {
        "express": "^4.17.1"
      }
    }
    ```
  - `"dependencies"`: Allows us to add packages from other smart ppl made
    ```
    npm install some-npm-package
    ```
  - `"scripts"`: run any cool command line scripts you want to write
    ```
    "scripts": {
        ...
        "party": "curl parrot.live"
        ...
    }
    ```

- Installing Express
  ```
  npm install --save express
  ```
  - Express is a web framework
  - We’ll be using it to create API endpoints
- Creating the hello world endpoint
    ```
    // importing the express module
    const express = require('express')

    // initializing the express framework
    const app = express()

    // registering an endpoint with express framework
    app.get('/', (req, res) => {
        res.send('Hello World!')
    })

    // allowing a port to access the express framework
    app.listen(3000, () => {
        console.log(`Example app listening at http://localhost:3000`)
    })
    ```

- Playing with Express

  - Get request with a query param

    - GET `http://localhost:3000/canIGetSomeZots`

    ```
    app.get('/canIGetSomeZots', (req, res) => {
    console.log("GET /canIGetSomeZots", req.query)

        const zotNumber = req.query.zotNumber;

        let zotString = '';
        for (let i = 0; i < zotNumber; i++) {
            zotString += 'Zot'
        }

        res.send(zotString);
    })
    ```

  - Post request with a body

    - POST `http://localhost:3000/canIGetSomeZots`

    ```
    app.post('/canIGetSomeZots', (req, res) => {
        console.log("POST /canIGetSomeZots", req.body)

        const zotNumber = req.body.zotNumber;

        let zotString = '';
        for (let i = 0; i < zotNumber; i++) {
            zotString += 'Zot'
        }

        res.send(zotString);
    })
    ```
    
  - Resources
    - [Express quickstart guide](https://expressjs.com/en/starter/installing.html)
    - [Express routing](https://expressjs.com/en/guide/routing.html)
# MongoDB

- There's SQL and there's NoSQL, what's the difference?
- Structure
  - SQL
    - Rows and columns
    - ![](./assets/sql.png)
  - Mongo NoSQL
    - Documents (JSON) -> Collections (array of Documents)
    - ![](./assets/mongo.png)
- Querying
  - SQL
    - `SELECT first_name FROM users WHERE last_name = "Smith"`
  - Mongo NoSQL
    - `db.users.find({lastName: "Smith"}, {firstName: 1})`

## Setting up a MongoDB instance in Atlas

1. Register for an account on MongoDB
2. Follow through the 4 steps Atlas suggests to get started
   - Skip -> Build `M0 Cluster`
   - Create username & password
   - Add your current IP address

## Connecting to the MongoDB instance with MongoDB Compass app

1. Open up MongoDB Compass app
2. Paste in your connection string and connect - Don't forget to change the `<dbname>`
   ![](./assets/mongodb_compass.png)

- MongoDB Compass is just one of many ways to connect to an instance
  - Other options include MongoDB Atlas online, mongo shell and Mongoose (what we're going to be using in with express)
  - Database connection string is one of the more common way to connect to databases

## Playing with MongoDB data

1. Create a database: `linkTreeClone`
2. Create a collection: `page`
3. Create a document:
   ```
   {
     "title": "Boba shops",
     "desc": "All the cool spots in Irvine",
     "creator": "Harrison",
     "links": ["yelp.com/sharetea", "yelp.com/omomo"]
   }
   ```

   - Mongo object automatically come with a unique id (\_id)
     - ![](./assets/mongodb-compass.png)

4. Querying in the shell (>\_MongoSH Beta)
   - Example usage
     - ![](./assets/mongo-query.png)
   - Find a page by the title
     - findOne(filter)
       - `db.page.findOne({title: “Boba shops”})`
   - Update the title of the page
     - findOneAndUpdate(filter, update)
       - `db.page.findOneAndUpdate({title: "Boba shops"}, {$set : {title: "Boba shops SO COOL"}})`
   - Add a link to a page
     - findOneAndUpdate(filter, update)
       - `db.page.findOneAndUpdate({title: "Boba shops"}, {$push: {links: "another link"}})`
   - Delete a page
     - findOneAndDelete(filter)
       - `db.page.findOneAndDelete({title: “Boba shops})`
   - Delete a link in a page
     - findOneAndUpdate(filter, update)
       - `db.page.findOneAndUpdate({title: "Boba shops"}, {$pull: {links: "another link"}})`

- Resources
  - [MongoDB query operations](https://docs.mongodb.com/manual/tutorial/query-documents/)

## Mongoose

1. Install Mongoose npm package

   ```
   $ npm install --save mongoose
   ```

   - A nice library someone smart made that lets us to connect to the database with javascript

2. Adding Mongoose to our express backend

   ```
   // import the mongoose package
   const mongoose = require('mongoose')

   // connect to the mongodb instance with the database connection string
   mongoose.connect("mongodb+srv://admin:runescape123@cluster0.123.mongodb.net/<dbname>?retryWrites=true&w=majority");
   ```

3. Create the schema

   - MongoDB is pretty free spirited with JSON
   - Mongoose wants you to define some schema/shape so it can auto-magically do things for you

   ```
   // create a mongoose schema
   const pageSchema = new mongoose.Schema({
       title: String,
       description: String,
       creator: String,
       links: [String]
   });

   // create a model, this model gives us a lot of helpful functions to let us create/manipulate objects with this schema
   const PageModel = mongoose.model('page', pageSchema);
   ```

4. Do interesting things with the Mongoose model

   ```
   // create an object in the database
   const pageModelInstance = new PageModel({
       title: "taco shops",
       description: "monch",
       creator: "taco cat",
       links: ["tacobell.com"]
   });
   pageModelInstance.save()

   // Ask interesting questions with queries similar to mongo shell
   const retrievedPage = await PageModel.findOne({"creator": "Harrison"}, {"title": 1})
   ```

- Other Resources
  - [Mongoose documentation](https://mongoosejs.com/docs/index.html)

## Slight detour to talk about environment variables

Previously, we used this snippet to connect to the mongodb instance:
  ```
  // connect to the mongodb instance with the database connection string
  mongoose.connect("mongodb+srv://admin:runescape123@cluster0.123.mongodb.net/<dbname>?retryWrites=true&w=majority");
  ```

It works great so I'm just gonna commit this code and push it to Github... **BONK!** Unfortunately, haxors are out here to get you and this is one of the common ways secrets get leaked out. How do we commit our code and prevent this??? Environment variables!

- What are environment variables?
    ```
    AN_ENV_VARIABLE=123123123
    KEY=VALUE
    IS_THIS_PRODUCTION=false
    GOOGLE_API_KEY=12j3h1g23j12h3123h123jkl1
    MONGODB_URI="mongodb+srv://admin:runescape123@cluster0.123.mongodb.net/<dbname>?retryWrites=true&w=majority"
    ```
    - Its a file (.env) that holds secrets/keys/passwords that your code needs
    - Not directly tied to the code and won't be commited onto GitHub
- Install dotenv package
   ```
   npm install --save dotenv
   ```
  - Automatically finds .env files in your project folder/directory
- How to use?
  ```
  // importing the dotenv package
  const dotenv = require("dotenv")

  // load in the environment from any .env file
  dotenv.config()

  // connect to the mongodb instance with the database connection string
  mongoose.connect(process.env.MONGODB_URI);
  ```
- Adding to .gitignore
  - This file tells git to blocklist any file you want and not keep track of them
  - Want to add .env files so we don't accidently push them up onto the cloud!!
    ```
    /node_modules
    .env
    ```
# Connecting everything together

## Create the express route to create a page

```
POST /createPage
{title, creator, desc, links}
```

## Create the express route to get a page

```
GET /getPage?id=123
```

## Create the express route to delete a page

```
DELETE /deletePage?id=123
```

## Create the express route to add a link

```
POST /addLink?id=123
{link: 'yelp.com/omomo'}
```

## Create the express route to remove a link

```
POST /removeLink?id=123
{link: 123123}
```

# What's next?

- Middleware
- Cors
- Authentication
- Sessions
- Project structures (routers, services, mvc)
- Async/await vs callbacks
