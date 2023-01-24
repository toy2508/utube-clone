import mongoose from "mongoose";
mongoose.connect(process.env.DB_URL);
const handelOpen = () => console.log("✔️  Connected to DB");
const handleError = (error) => console.log("❌  DB Error", error);
mongoose.connection.once("open", handelOpen);
mongoose.connection.on("error", handleError);
