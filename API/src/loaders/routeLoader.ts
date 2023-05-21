import { Express } from "express";

import addUser from "../routes/addUser";
import getUsers from "../routes/getUsers";
import editUser from "../routes/editUser";
import deleteUser from "../routes/deleteUser";
import getNewUserId from "../routes/getNewUserId";

export const loadRoutes = (app: Express) => {
  app.use(addUser);
  app.use(getUsers);
  app.use(editUser);
  app.use(deleteUser);
  app.use(getNewUserId);
};
