

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;


const urlDatabase = {};


function generateShortUrl(originalUrl) {
    
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
