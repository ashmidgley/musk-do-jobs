const express = require('express')
const path = require('path');
const app = express();
const port = 4200;

app.use(express.static(__dirname + '/dist/ChecklistWeb'));

app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname + '/dist/ChecklistWeb/index.html'))
);

app.listen(port, function () {
    console.log(`Listening on port ${port}`);
});