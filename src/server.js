import express from "express";
import { config } from "dotenv";
config(); // Config function will map the variables defined in .env file to node process

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json()); // This statement will parses the data stream to json which will comes from client;

app.get("/health-check", (req, res) => {
  res.status(200).json({ message: "I am alive..!" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
