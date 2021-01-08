const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT ? process.env.PORT : 3000;

// set up CORS and static files
app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static('public'));

app.get('/', (__, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
