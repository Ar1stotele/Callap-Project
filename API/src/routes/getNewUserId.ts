import { Router, Request, Response } from "express";
import fs from "fs";
import { IUser } from "../interfaces/IUser";
import { API_ROUTES } from "../constants";

const router = Router();

router.get(API_ROUTES.GET_NET_USER_ID, (req: Request, res: Response) => {
  try {
    fs.readFile(
      "data.json",
      "utf8",
      (err: NodeJS.ErrnoException | null, data: string) => {
        if (err) {
          throw new Error("Something went wrong");
        }
        const usersData = JSON.parse(data);
        let maxId = usersData.reduce((maxItem: IUser, currentItem: IUser) => {
          if (currentItem.id > maxItem.id) {
            return currentItem;
          } else {
            return maxItem;
          }
        });
        maxId.id += 1;

        res.status(200).send({ maxId: maxId.id });
      }
    );
  } catch (err) {
    res.send("error");
  }
});

export default router;
