const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const users = ["Himel","Sajib", "Tinni", "Deep", "Rezaul", "Harami", "Arpita"];

app.get("/", (req, res) => {
  const fruit = {
    product: "ada",
    price: 120,
  };
  res.send(fruit);
});

app.get("/fruits", (req, res) => {
  const fruits = [
    {
      id: 1,
      type: "peach",
      taste: "sweet",
      texture: "fuzzy",
      season: "summer",
      created_at: "2017-04-06 22:37:11",
      updated_at: "2017-04-06 22:37:11",
    },
    {
      id: 2,
      type: "cherry",
      taste: "tart",
      texture: "smooth",
      season: "summer",
      created_at: "2017-04-06 22:37:28",
      updated_at: "2017-04-06 22:37:28",
    },
    {
        "genus": "Fragaria",
        "name": "Strawberry",
        "id": 3,
        "family": "Rosaceae",
        "order": "Rosales",
        "nutritions": {
            "carbohydrates": 5.5,
            "protein": 0,
            "fat": 0.4,
            "calories": 29,
            "sugar": 5.4
        }
      }, {
        "genus": "Musa",
        "name": "Banana",
        "id": 2,
        "family": "Musaceae",
        "order": "Zingiberales",
        "nutritions": {
            "carbohydrates": 22,
            "protein": 0,
            "fat": 0.2,
            "calories": 96,
            "sugar": 17.2
        }
      }
  ];
  res.send(fruits);
});

app.get('/users/:id', (req, res) =>{
    const id = req.params.id;
    const name = users[id];
    res.send({id,name});
})

//post
app.post('/addUser', (req, res) =>{
  //save to database
  const user = req.body;
  user.id = 55;
  res.send(user);
})

app.listen(3000, () => console.log("listening to port 3000"));
