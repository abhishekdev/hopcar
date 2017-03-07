const compression = require('compression');
const express = require('express');
const path = require('path');

const app = express();
const env = process.env.NODE_ENV || 'development';

app.set('port', (process.env.PORT || 5000));

// Enable gzip
app.use(compression());

// Disable source maps in production
if (env === 'production') {
    app.use('/*.map', (req, res, next) => {
        res.status(404).send('Sorry cannot find that!');
    });
}

app.use('/', express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
    // All requests fallback to the index.html (viz. a Single Page Application)
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(app.get('port'), () => console.log('Hopcar server is running on port', app.get('port')));
