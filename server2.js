const express =  require('express');

const app = express();

const port = 3001;

app.use(express.json());

const cats = ['Dog', 'Meow', 'Hamster'];

app.get('/api/cat', (req, res) => {
    console.log('@server.js GET /api/cat in');
    try {
        const { query } = req;
        
        if (query.sendList) {
            res.send(200, cats);
            console.log('@server.js GET /api/cat out');
            return;
        }

        res.send(200, 'Cat');
        console.log('@server.js GET /api/cat in');
    } catch (err) {
        console.err(`@server.js GET /api/cat err: ${err}`);
        return res.send(500, err);
    }
});

app.post('api/cat/add', (req, res) => {
    console.log('@server.js POST/api/cat/add in');
    try {
        const { body } = req;

        body.forEach((newCat) => {
            cats.push(newCat);
        });
        
        res.send(200, 'Successfully added new cats');
        console.log('@server.js POST/api/cat/add out');
    } catch (err) {
        console.err(`@server.js POST /api/cat/add err: ${err}`);
        return res.send(500, err);
    }
});

app.listen(port, () => {
    console.log(`Server is listening on port: ${port}...`);
});
