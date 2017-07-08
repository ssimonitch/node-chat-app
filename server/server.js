require('./config/config');

const path = require('path');
const express = require('express');

const app = express();
const port = process.env.PORT;
const publicPath = path.join(__dirname, '../public');

// server static file
app.use(express.static(publicPath));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
