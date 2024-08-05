const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const auth = require("./middleware/auth");
require("dotenv").config();


const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Routes
app.use("/user", require("./routes/userRouter"));
// app.use("/api", require("./routes/categoryRouter"));

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

async function connectToMongoDB() {
  try {
    const URI = process.env.MONGODB_URL;
    await mongoose.connect(URI);
    console.log("Connected to MongoDB successfully!");
  } catch (error) {
    console.error("Error connecting to MongoDB :", error);
  }
}

connectToMongoDB();
