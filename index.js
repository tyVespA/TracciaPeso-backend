require("dotenv").config();
const express = require("express");
const cors = require("cors");
const Weight = require("./models/weight");

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("dist"));

app.get("/api/weights", (req, res) => {
  Weight.find({}).then((weights) => {
    res.json(weights);
  });
});

app.get("/api/weights/:id", (req, res) => {
  const id = Number(req.params.id);
  const weight = weights.find((weight) => weight.id === id);

  if (weight) {
    res.json(weight);
  } else {
    res.status(400).end();
  }
});

app.delete("/api/weights/:id", (req, res) => {
  const id = Number(req.params.id);
  weights = weights.filter((weight) => weight.id !== id);

  res.status(204).end();
});

app.post("/api/weights", (req, res) => {
  const weight = {
    id: weights.length + 1,
    weight: Number(req.body.weight),
  };

  if (!req.body.weight) {
    return res.status(400).json({
      error: "content missing",
    });
  }

  console.log(weight);
  res.json(weight);

  weights = weights.concat(weight);
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("App running on port " + PORT);
});
