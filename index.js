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

app.get("/api/weights/:id", (req, res, next) => {
  Weight.findById(req.params.id)
    .then((weight) => {
      if (weight) {
        res.json(weight);
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => next(err));
});

app.delete("/api/weights/:id", (req, res, next) => {
  Weight.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((err) => next(err));
});

app.put("/api/weights/:id", (req, res, next) => {
  const body = req.body;

  const weight = {
    weight: body.weight,
  };

  Weight.findByIdAndUpdate(req.params.id, weight, { new: true })
    .then((updatedWeight) => {
      if (updatedWeight) {
        res.json(updatedWeight);
      } else {
        res.status(404).end;
      }
    })
    .catch((err) => next(err));
});

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

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (err, req, res, next) => {
  console.error(err.message);

  if (err.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  }
  next(err);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("App running on port " + PORT);
});
