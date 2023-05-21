import { Router, Request, Response } from "express";
import fs from "fs";
import { API_ROUTES } from "../constants";
import { IUser } from "../interfaces/IUser";

const router = Router();

router.post(API_ROUTES.DELETE_USER, (req: Request, res: Response) => {
  try {
    fs.readFile(
      "data.json",
      "utf8",
      (err: NodeJS.ErrnoException | null, data: string) => {
        if (err) {
          console.error(err);
          return;
        }
        const usersData = JSON.parse(data);
        const deletedUser = req.body;
        const userToDeleteIndex = usersData.findIndex(
          (user: IUser) => deletedUser.id === user.id
        );

        usersData.splice(userToDeleteIndex, 1);
        fs.writeFile(
          "./data.json",
          JSON.stringify(usersData),
          "utf8",
          (err) => {
            if (err) {
              throw new Error("Something went wrong");
            }
          }
        );
        res.send(usersData);
      }
    );
  } catch (err) {
    res.send("error");
  }
});

export default router;
