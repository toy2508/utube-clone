import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/wetube");

const handelOpen = () => console.log("✔️  Connected to DB");
const handleError = (error) => console.log("❌  DB Error", error);

mongoose.connection.once("open", handelOpen);
mongoose.connection.on("error", handleError);
