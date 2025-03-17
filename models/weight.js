const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URI;

console.log("connecting to", url);
mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const weightSchema = new mongoose.Schema(
  {
    weight: {
      type: Number,
      min: [0.1, "Weight must be at least 0.1"],
      max: [299, "No one weights more than 300!"],
      required: true,
    },
    userId: { type: String, required: true },
  },
  { timestamps: true }
);

weightSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Weight", weightSchema);
