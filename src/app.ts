import express, { Express, Request, Response } from "express";
import { config } from "dotenv";
config(); // Config function will map the variables defined in .env file to node process

import contactsRouter from "./routes/contacts.routes";

const app: Express = express();
const port: Number = Number(process.env.PORT) || 5000;

app.use(express.json()); // This statement will parses the data stream to json which will comes from client;

app.use("/api/contacts", contactsRouter);

app.get("/health-check", (req: Request, res: Response) => {
  res.status(200).json({ message: "I am alive..!" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
