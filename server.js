const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
const port = process.env.port || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

if (process.env.NODE_ENV === 'production') {
 app.use(express.static(path.join(__dirname, 'client/build')));

 app.get('/', function (req, res) {

  if (req.originalUrl) {
   const originalUrlParts = req.originalUrl.split('/');
   const isRootReq = originalUrlParts.length === 2;
   const isFavIconReq = originalUrlParts.pop() === 'favicon.ico';
   if (isFavIconReq) {
    res.sendFile(path.join(__dirname, 'client/build', 'favicon.ico'));
   } else {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
   }
  }
  });
}

app.listen(port, error => {
 if (error) throw error;
 console.log('server running on port ' + port);
});

app.post('/payment', (req, res) => {
 const body = {
  source: req.body.token.id,
  amount: req.body.amount,
  currency: 'usd',
 };

 stripe.charges.create(body, (stripeErr, stripeRes) => {
  if (stripeErr) {
   res.status(500).send({ error: stripeErr });
  } else {
   res.status(200).send({ success: stripeRes });
  }
 });
});