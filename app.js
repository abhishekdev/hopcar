const express = require('express');
const path = require('path');

const app = express();

app.set('port', (process.env.PORT || 5000));

app.use('/', express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
    // All requests fallback to the index.html SPA
    res.sendfile(path.join(__dirname, 'dist/index.html'));
});

app.listen(app.get('port'), () => console.log('Node server is running on port', app.get('port')));
