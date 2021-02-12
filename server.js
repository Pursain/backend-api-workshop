// importing libraries
const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config();

// import the file we made
const PageModel = require("./pageModel");

// initializing the express framework
const app = express()

// we'll leave this as a mystery for now :)
// if you want to look into this, this is middleware
app.use(express.json());

// connect to mongodb
mongoose.connect(process.env.MONGODB_URI, {});

/*
    this is how you register an endpoint with express framework
*/
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

// errors that gets thrown here automatically turns into a status 500
app.get('/somethingBroke', (req, res) => {
    console.log("GET /somethingBroke")
    throw "Something broke, I need hel..."
})

app.get('/somethingsNotRight', (req, res) => {
    console.log("GET /somethingsNotRight")
    res.status(400).send("Uh oh, somethings not right");
})

app.post('/createPage', (req, res) => {
    const { title, desc, creator, links } = req.body;

    const pageModelInstance = new PageModel({
        title: title,
        description: desc,
        creator: creator,
        links: links
    });

    pageModelInstance.save()
        .then(confirmedPage => res.send(confirmedPage))

})


app.get('/getPage', (req, res) => {
    const { id } = req.query;

    console.log(id)
    PageModel.findOne({ _id: id })
        .then(resultPage => res.send(resultPage))

})

app.delete('/deletePage', (req, res) => {
    const { id } = req.query;

    console.log(id)
    PageModel.findOneAndDelete({ _id: id })
        .then(resultPage => res.send(resultPage))

})

app.post('/addLink', (req, res) => {
    const { id } = req.query;
    const { link } = req.body;

    console.log(id)
    PageModel.findOneAndUpdate({ _id: id }, { $push: { links: link } })
        .then(resultPage => res.send(resultPage))

})

app.post('/deleteLink', (req, res) => {
    const { id } = req.query;
    const { link } = req.body;

    console.log(id)
    PageModel.findOneAndUpdate({ _id: id }, { $pull: { links: link } })
        .then(resultPage => res.send(resultPage))

})


app.listen(3000, () => {
    console.log(`Example app listening at http://localhost:3000`)
})