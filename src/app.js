import express, { json } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { db } from "./database/database.connection.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(json());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`
 Running API MyWallet on port ${PORT},
 Url: http://localhost:${PORT} 
`));