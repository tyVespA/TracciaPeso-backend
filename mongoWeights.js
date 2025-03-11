const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://tyVespA:${password}@cluster0.rhuvl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

//

const weightSchema = new mongoose.Schema({
  weight: Number,
  id: Number,
});

const Weight = mongoose.model("Weight", weightSchema);

// const weight = new Weight({
//   weight: 70.1,
//   // id: 1,
// });

Weight.find({}).then((result) => {
  result.forEach((weight) => {
    console.log(weight);
  });
  mongoose.connection.close();
});

// weight.save().then((result) => {
//   console.log("saved");
//   mongoose.connection.close();
// });
