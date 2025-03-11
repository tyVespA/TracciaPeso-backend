const express = require("express");
const app = express();
const PORT = 3001;

app.use(express.json());

let weights = [
  {
    id: 1,
    weight: 70,
  },
  {
    id: 2,
    weight: 70,
  },
  {
    id: 3,
    weight: 69,
  },
  {
    id: 4,
    weight: 69.4,
  },
  {
    id: 5,
    weight: 69.7,
  },
];

app.get("/", (req, res) => {
  res.send("HOME");
});

app.get("/api/weights", (req, res) => {
  res.json(weights);
});

app.get("/api/weights/:id", (req, res) => {
  const id = req.params.id;
  const weight = weights.find((weight) => weight.id === id);

  if (weight) {
    res.json(weight);
  } else {
    res.status(400).end();
  }
});

app.delete("/api/weights/:id", (req, res) => {
  const id = req.params.id;
  weights = weights.filter((weight) => weight.id !== id);

  res.status(204).end();
});

app.post("/api/weights", (req, res) => {
  const weight = {
    id: weights.length + 1,
    weight: req.body.weight,
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

app.listen(PORT, () => {
  console.log("App running on port " + PORT);
});
