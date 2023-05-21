import { Router, Request, Response } from "express";
import fs from "fs";
import { API_ROUTES } from "../constants";

const router = Router();

router.get(API_ROUTES.GET_USERS, (req: Request, res: Response) => {
  try {
    fs.readFile(
      "data.json",
      "utf8",
      (err: NodeJS.ErrnoException | null, data: string) => {
        if (err) {
          throw new Error("Something went wrong");
        }
        const usersData = JSON.parse(data);
        res.status(200).send(usersData);
      }
    );
  } catch (err) {
    res.send("error");
  }
});

export default router;
