require('dotenv').config();
const express = require('express');
const cors = require('cors');
const dayjs = require('dayjs');
const app = express();
const port = process.env.PORT ? process.env.PORT : 3000;

const utc = require('dayjs/plugin/utc');
dayjs.extend(utc);

// set up CORS and static files
app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static('public'));

// serve landing page
app.get('/', (__, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/:date?', (req, res) => {
  const param = req.params.date ? req.params.date : '';
  const re = /^\d+$/;
  const isTimestamp = param.match(re);
  let dateObj;

  if (param) {
    dateObj = dayjs.utc(isTimestamp ? parseInt(param) : param);
  } else {
    dateObj = dayjs.utc();
  }

  if (dateObj.isValid()) {
    const utc = dateObj.toString();
    const unix = dateObj.valueOf();

    res.json({ unix, utc });
  } else {
    res.json({ error: 'Invalid Date' });
  }
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
