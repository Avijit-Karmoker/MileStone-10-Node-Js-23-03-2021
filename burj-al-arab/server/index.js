const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.2zom1.mongodb.net/BurjAlArab?retryWrites=true&w=majority`;
const port = 5000;

app.use(cors());
app.use(express.json());

var admin = require("firebase-admin");
var serviceAccount = require("./configs/burj-al-arab-1f8e0-firebase-adminsdk-4uaxb-13c5a9f534.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIRE_DB
});

const pass = "ArabianHorse79";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  const bookings = client.db("BurjAlArab").collection("bookings");

  app.post("/addBooking", (req, res) => {
    const newBooking = req.body;
    bookings.insertOne(newBooking).then((result) => {
      res.send(result.insertedCount > 0);
    });
    console.log(newBooking);
  });

  app.get("/bookings", (req, res) => {
    const bearer = req.headers.authorization;
    if (bearer && bearer.startsWith("Bearer ")) {
      const idToken = bearer.split(" ")[1];
      admin
        .auth()
        .verifyIdToken(idToken)
        .then((decodedToken) => {
          let tokenEmail = decodedToken.email;
          if (tokenEmail == req.query.email) {
            bookings
              .find({ email: req.query.email })
              .toArray((err, documents) => {
                res.status(200).send(documents);
              });
          }
          // const uid = decodedToken.uid;
          // console.log({uid});
        })
        .catch((error) => {
          res.status(401).send("Un-authorized access");
        });
    } else {
      res.status(401).send("Un-authorized access");
    }
  });
});

app.listen(port);
