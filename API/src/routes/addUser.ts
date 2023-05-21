import { Router, Request, Response } from "express";
import fs from "fs";
import { API_ROUTES } from "../constants";

const router = Router();

router.post(API_ROUTES.ADD_USER, (req: Request, res: Response) => {
  try {
    fs.readFile("data.json", "utf8", (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      const usersData = JSON.parse(data);
      const addUser = req.body;

      usersData.push(addUser);
      fs.writeFile("./data.json", JSON.stringify(usersData), "utf8", (err) => {
        if (err) {
          throw new Error("Something went wrong");
        }
      });
      res.send(usersData);
    });
  } catch (err) {
    res.send("error");
  }
});

export default router;
