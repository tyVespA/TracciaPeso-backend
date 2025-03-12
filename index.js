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
  Weight.findById(req.params.id).then((weight) => {
    res.json(weight);
  });
});

// app.delete("/api/weights/:id", (req, res) => {
//   const id = Number(req.params.id);
//   weights = weights.filter((weight) => weight.id !== id);

//   res.status(204).end();
// });

app.post("/api/weights", (req, res) => {
  const body = req.body;

  if (!body.weight) {
    return res.status(400).json({
      error: "content missing",
    });
  }

  const weight = new Weight({
    weight: Number(body.weight),
  });

  weight.save().then((savedWeight) => {
    res.json(savedWeight);
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("App running on port " + PORT);
});
