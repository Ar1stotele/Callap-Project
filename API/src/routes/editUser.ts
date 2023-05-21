import { Router, Request, Response } from "express";
import fs from "fs";
import { API_ROUTES } from "../constants";

const router = Router();

router.post(API_ROUTES.EDIT_USER, (req: Request, res: Response) => {
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
        const editedUserInfo = req.body;

        const userToUpdateIndex = usersData.findIndex(
          (user: any) => editedUserInfo.id === user.id
        );

        usersData[userToUpdateIndex] = editedUserInfo;
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
