const express = require("express");
const app = express();
const PORT = 3001;

let weights = [
  {
    id: "1",
    weight: 70,
  },
  {
    id: "2",
    weight: 70,
  },
  {
    id: "3",
    weight: 69,
  },
  {
    id: "4",
    weight: 69.4,
  },
  {
    id: "5",
    weight: 69.7,
  },
];

app.get("/", (req, res) => {
  res.send("HOME");
});

app.get("/api/weights", (req, res) => {
  res.json(weights);
});

app.listen(PORT, () => {
  console.log("App running on port " + PORT);
});
