const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");

const app = express();

dotenv.config({ path: ".env" });

// middleware
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set("view engine", "ejs");

// database connection

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get("/", (req, res) => res.render("home"));
app.get("/smoothies", (req, res) => res.render("smoothies"));
app.use(authRoutes);

//cookies
app.get("/set-cookies", (req, res) => {
  // res.setHeader('Set-Cookie', "newUser=true");
  res.cookie('newUser', false);
  res.cookie('isEmployee', true, { maxAge: 1000 * 60, httpOnly: true }); //Cookie will be stored for a minute 
  //secure: true only accessible through https request;
  // httpOnly: cannot access using document.cookie from frontend
  res.send("You got the cookies!");
});

app.get("/read-cookies", (req, res) => {
  const cookies = req.cookies;
  console.log(cookies);
  res.json(cookies);
});