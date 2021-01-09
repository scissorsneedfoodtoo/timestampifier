require('dotenv').config();
const express = require('express');
const cors = require('cors');
const dayjs = require('dayjs');
const app = express();
const port = process.env.PORT ? process.env.PORT : 3000;

// set up CORS and static files
app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static('public'));

// serve landing page
app.get('/', (__, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/timestamp/:date?', (req, res) => {
  const param = req.params.date ? req.params.date : dayjs().toString();
  const re = /^\d+$/;
  const isTimestamp = param.match(re);
  const dateObj = dayjs(isTimestamp ? parseInt(param) : param);
  const utc = dateObj.toString();
  const unix = dateObj.valueOf();

  if (dateObj.isValid()) {
    console.log({ unix, utc });
    res.json({ unix, utc });
  } else {
    res.json({ error: 'Invalid Date' });
  }
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
