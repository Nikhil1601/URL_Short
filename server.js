// const express = require('express')
// const router = express.router()

// const app = express()

// const Port = 3000;

// app.set('view engine', 'ejs')

// app.get('/',(req,res)=>{
//     res.render('index');
// });

// app.listen(Port)

// const express = require('express');
// const bodyParser = require('body-parser');

// const app = express();
// const port = process.env.PORT || 3000;

// // Middleware to parse JSON and URL-encoded request bodies
// app.use(bodyParser.json()); // for parsing application/json
// app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// // Example route to handle POST requests
// app.post('/api/submit', (req, res) => {
//     const { url } = req.body; // Access data from the request body

//     // Custom logic to generate a short URL (you can use your hash function here)
//     const shortUrl = generateShortUrl(url);

//     // Process the data (e.g., save to a database)
//     // ...

//     res.status(200).json({ shortUrl });
// });
// app.set('view engine', 'ejs')
// // Route to render the index view
// app.get('/', (req, res) => {
//     res.render('index'); // Renders the "index.ejs" view
// });

// app.listen(port, () => {
//     console.log(`Server running on port ${port}`);
// });

// // Custom hash function to generate short URLs
// function generateShortUrl(originalUrl) {
//     // Your custom logic here (e.g., hash function)
//     // For simplicity, I'm using a placeholder value
//     return 'abc123';
// }


const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// In-memory storage for short URLs
const urlDatabase = {};

// Custom hash function to generate short URLs
function generateShortUrl(originalUrl) {
    // Your custom logic here (e.g., hash function)
    // For simplicity, I'm using a placeholder value
    return 'abc123';
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Route to create a short URL
app.post('/shorten', (req, res) => {
    const originalUrl = req.body.url;
    const shortUrl = generateShortUrl(originalUrl);

    // Store the short URL in the in-memory database
    urlDatabase[shortUrl] = originalUrl;

    res.json({ shortUrl });
});

// Route to retrieve the original URL (without redirection)
app.get('/:shortUrl', (req, res) => {
    const shortUrl = req.params.shortUrl;
    const originalUrl = urlDatabase[shortUrl];

    if (originalUrl) {
        res.json({ originalUrl }); // Return the original URL
    } else {
        res.status(404).json({ error: 'Short URL not found' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
