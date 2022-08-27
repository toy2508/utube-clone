import express from "express";
const app = express();

const PORT = 4000;

app.get("/", (req, res, next) => {
  console.log("hi");
  next();
});

app.get("/", (req, res) => {
  return res.send("Hi Seokho");
});

const handlerListening = () =>
  console.log(`Server is running at http://localhost:${PORT}`);

app.listen(PORT, handlerListening);
