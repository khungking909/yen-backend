import express from "express";
import dotenv from "dotenv";
import route from "./routes/index.js";
import cors from 'cors'
import { connectDB, DB, syncDatabase } from "./databases/connect.js";
import { associateModels } from "./models/accosiation.js";

dotenv.config();
const app = express();
app.use(cors())
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
route(app)
app.listen(process.env.PORT, () => {
  console.log(`RUNNING IN PORT = ${process.env.PORT}`);
  connectDB();
  associateModels();
  syncDatabase(DB);
});
