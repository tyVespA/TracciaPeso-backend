require("dotenv").config();
const jwt = require("jsonwebtoken");
const authenticateUser = require("./middleware/auth");
const authRoutes = require("./auth/firebase/authTest");
const path = require("path");
const express = require("express");
const cors = require("cors");
const Weight = require("./models/weight");

const allowedOrigins = [
  "http://localhost:5173",
  "https://weight-tracker-xyes.onrender.com/",
];

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.static(path.join(__dirname, "dist")));

app.use("/", authRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.get("/api/weights", authenticateUser, (req, res) => {
  Weight.find({ userId: req.user.id }).then((weights) => {
    res.json(weights);
  });
});

app.post("/api/weights", authenticateUser, (req, res, next) => {
  const { weight } = req.body;

  const newWeight = new Weight({
    weight: Number(weight),
    userId: req.user.id,
  });

  newWeight
    .save()
    .then((savedWeight) => res.json(savedWeight))
    .catch((err) => next(err));
});

app.get("/api/weights/:id", authenticateUser, (req, res, next) => {
  Weight.findOne({ _id: req.params.id, userId: req.user.id })
    .then((weight) => {
      if (weight) res.json(weight);
      else res.status(404).json({ message: "Not found" });
    })
    .catch((err) => next(err));
});

app.put("/api/weights/:id", authenticateUser, (req, res, next) => {
  Weight.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    { weight: req.body.weight },
    { new: true, runValidators: true, context: "query" }
  )
    .then((updatedWeight) => {
      if (updatedWeight) res.json(updatedWeight);
      else res.status(404).json({ message: "Not found" });
    })
    .catch((err) => next(err));
});

app.delete("/api/weights/:id", authenticateUser, (req, res, next) => {
  Weight.findOneAndDelete({ _id: req.params.id, userId: req.user.id })
    .then((result) => {
      if (result) res.status(204).end();
      else res.status(404).json({ message: "Not found" });
    })
    .catch((err) => next(err));
});

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (err, req, res, next) => {
  console.error(err.message);

  if (err.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  } else if (err.name === "ValidationError") {
    return res.status(400).json({ error: err.message });
  }
  next(err);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("App running on port " + PORT);
});
