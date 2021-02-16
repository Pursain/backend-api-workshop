// importing libraries
const express = require('express')
const mongoose = require('mongoose')
const dotenv = require("dotenv")

// load in the environment from any .env file
dotenv.config()

// connect to the mongodb instance with the database connection string
mongoose.connect(process.env.MONGODB_URI);

// initializing the express framework
const app = express()

// create a mongoose schema
const pageSchema = new mongoose.Schema({
    title: String,
    description: String,
    creator: String,
    links: [String]
});

// create a model, this model gives us a lot of helpful functions to let us create/manipulate objects with this schema
const PageModel = mongoose.model('page', pageSchema);

// we'll leave this as a mystery for now :)
// if you want to look into this, this is middleware
app.use(express.json());

// this is how you register an endpoint with express framework
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/canIGetAZot', (req, res) => {
    console.log("GET /canIGetSomeZots")
    res.send("Zot!");
})

app.get('/canIGetSomeZots', (req, res) => {
    console.log("GET /canIGetSomeZots")
    console.log(req.query)
    const zotNumber = req.query.zotNumber;

    let zotString = '';
    for (let i = 0; i < zotNumber; i++) {
        zotString += 'Zot'
    }

    res.send(zotString);
})

app.post('/canIGetSomeZots', (req, res) => {
    console.log("POST /canIGetSomeZots")
    console.log(req.body)
    const zotNumber = req.body.zotNumber;

    let zotString = '';
    for (let i = 0; i < zotNumber; i++) {
        zotString += 'Zot'
    }

    res.send(zotString);
})

/*
## Create the express route to create a page
- POST /createPage
- Send JSON in the body
  ```
  {
    "title": "Joe", 
    "creator": "me", 
    "desc": "coolbeans", 
    "links": ["link1", "link2"]
  }
  ```
*/
app.post('/createPage', (req, res) => {
    console.log("POST /createPage with body")   

    const title = req.body.title;
    const desc = req.body.desc;
    const creator = req.body.creator;
    const links = req.body.links;

    console.log("Body: ", title, desc, creator, links)   

    const pageModelInstance = new PageModel({
        title: title,
        description: desc,
        creator: creator,
        links: links
    });

    pageModelInstance.save()
        .then(confirmedPage => res.send(confirmedPage))
})

/*
## Create the express route to get a page
- GET /getPage?id=123
- Sends the id of the page through a query parameter `id`
*/
app.get('/getPage', (req, res) => {
    console.log("GET /getPage")

    const id = req.query.id;

    console.log("Query param: ", id)

    PageModel.findOne({ _id: id })
        .then(resultPage => res.send(resultPage))
})

/*
## Create the express route to delete a page
- GET /deletePage?id=123
- Sends the id of the page through a query parameter `id`
*/
app.delete('/deletePage', (req, res) => {
    console.log("DELETE /deletePage")

    const id = req.query.id;

    console.log("Query param: ", id)

    PageModel.findOneAndDelete({ _id: id })
        .then(resultPage => res.send(resultPage))
})

/*
## Create the express route to add a link
- POST /addLink?id=123
- Sends the id of the page through a query parameter `id`
- Send JSON in the body
  ```
  {
    "link": "newLink"
  }
  ```
*/
app.post('/addLink', (req, res) => {
    console.log("POST /addLink")

    const id = req.query.id;
    const link = req.body.link;

    console.log("Query param: ", id)
    console.log("Body: ", link)   

    PageModel.findOneAndUpdate({ _id: id }, { $push: { links: link } })
        .then(resultPage => res.send(resultPage))
})


/*
## Create the express route to remove a link
- POST /deleteLink?id=123
- Sends the id of the page through a query parameter `id`
- Send JSON in the body
  ```
  {
    "link": "linkToRemove"
  }
  ```
*/
app.post('/deleteLink', (req, res) => {
    console.log("DELETE /deleteLink")

    const id = req.query.id;
    const link = req.body.link;

    console.log("Query param: ", id)
    console.log("Body: ", link)  

    PageModel.findOneAndUpdate({ _id: id }, { $pull: { links: link } })
        .then(resultPage => res.send(resultPage))
})


app.listen(3000, () => {
    console.log(`Example app listening at http://localhost:3000`)
})