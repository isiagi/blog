const express = require("express");
const mongoose = require("mongoose");
const methodRide = require("method-override");
const articleRoute = require("./routes/article");

const Article = require("./models/article");

const app = express();

mongoose.connect("mongodb://localhost/blog", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodRide("_method"));

app.use("/articles", articleRoute);

app.get("/", async (req, res) => {
  const article = await Article.find().sort({ createdAt: "desc" });
  try {
    res.render("articles/index", { text: article });
  } catch (error) {
    console.log(error);
  }
});

app.listen(7000, () => {
  console.log(`we are listning at port 4000`);
});
