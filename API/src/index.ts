import express, { Express, json, urlencoded } from "express";
import dotenv from "dotenv";
import cors from "cors";

import { loadRoutes } from "./loaders/routeLoader";

dotenv.config();

const app: Express = express();
app.use(json());
app.use(urlencoded({ extended: true })); // for sending requests from postman
app.use(cors());

const port = process.env.PORT;

loadRoutes(app);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
