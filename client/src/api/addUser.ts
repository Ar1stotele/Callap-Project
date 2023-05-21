import axios from "axios";
import { API } from "../constants";
import { IUser } from "../models/IUser";

export async function addUser(newUser: IUser): Promise<IUser[]> {
  return (await axios.post(`${API.url}${API.routes.addUser}`, newUser)).data;
}
