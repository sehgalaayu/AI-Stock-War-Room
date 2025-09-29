import express, { Request, Response } from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";

dotenv.config();

const app = express();

app.use(helmet());
app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Ai stock room api working",
  });
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Port listening on ${port}`);
});
