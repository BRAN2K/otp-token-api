import express, { type Request, type Response } from "express";
import { env } from "@/config/env";

const app = express();

app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(env.PORT, () => {
  console.log(`Server running at ${env.HOST}:${env.PORT}`);
});
