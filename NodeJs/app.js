const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.statusCode = 404;
  res.write(`
    <h1>Page Not Found</h1>
    `);
  res.end();
});
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running at : 
        http://localhost:${PORT}`);
});
