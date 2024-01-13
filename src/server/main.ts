import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { BadDriverInfoInterface } from "../shared/types";

const server = express();

server.use(express.json());
server.use(cors());

const port = process.env.PORT || 4000;

const badDrivers: BadDriverInfoInterface[] = [
  {
    licensplate: "CS87100",
    count: 39,
  },
  {
    licensplate: "CS87101",
    count: 38,
  },
  {
    licensplate: "CS87102",
    count: 37,
  },
  {
    licensplate: "CS87103",
    count: 36,
  },
  {
    licensplate: "CS87104",
    count: 35,
  },
  {
    licensplate: "CS87105",
    count: 34,
  },
  {
    licensplate: "CS87106",
    count: 33,
  },
  {
    licensplate: "CS87107",
    count: 32,
  },
  {
    licensplate: "CS87108",
    count: 32,
  },
  {
    licensplate: "CS87109",
    count: 31,
  },
];

server.get("/api", (req, res, next) => {
  res.send({ Message: "React client connected to the Express server!" });
});

server.get("/api/top10", (req, res, next) => {
  res.send({ badDrivers });
});

server.post("/api/report_bad_driver", (req, res, next) => {
  const report: BadDriverInfoInterface = req.body;
  console.log(report);
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
