import "dotenv/config";
import "./db";
import "./models/Video";
import "./models/User";
import "./models/Comment";
import app from "./server";

const PORT = process.env.PORT;

const handlerListening = () =>
  console.log(`Server is running at http://localhost:${PORT}`);

app.listen(PORT, handlerListening);
