const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
// const compression = require("compression");

const enforce = require("express-sslify");

if (process.env.NODE_ENV !== "production") require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();
app.set('port', (process.env.PORT || 5000));
const port = process.env.port || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

console.log(`Arun -> ${process.env.NODE_ENV}`);

if (process.env.NODE_ENV === "production") {
//   app.use(compression);
  app.use(enforce.HTTPS({ trustProtoHeader: true }));
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("/service-worker.js", (req, res) => {
    res.sendFile(path.resolve(__dirname, "..", "build", "service-worker.js"));
  });
}

app.get('/', function(request, response) {
    var result = 'App is running'
    response.send(result);
}).listen(app.get('port'), function() {
    console.log('App is running, server is listening on port ', app.get('port'));
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});



app.listen(port, (error) => {
  if (error) throw error;
  console.log("server running on port " + port);
});

app.post("/payment", (req, res) => {
  const body = {
    source: req.body.token.id,
    amount: req.body.amount,
    currency: "usd",
  };

  stripe.charges.create(body, (stripeErr, stripeRes) => {
    if (stripeErr) {
      res.status(500).send({ error: stripeErr });
    } else {
      res.status(200).send({ success: stripeRes });
    }
  });
});
