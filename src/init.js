import "./db";
import "./models/Video";
import app from "./server";

const PORT = 4000;

const handlerListening = () =>
  console.log(`Server is running at http://localhost:${PORT}`);

app.listen(PORT, handlerListening);
