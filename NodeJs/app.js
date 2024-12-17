const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require("path");
const routeDir = require("./util/path-util")
const hostRouter = require("./routers/hostRouter")
const storeRouter = require("./routers/storeRouter")
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(hostRouter);
app.use(storeRouter);

app.use((req, res, next) => {
    res.statusCode = 404;
    res.sendFile(path.join(routeDir, 'views', "404.html"))
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

