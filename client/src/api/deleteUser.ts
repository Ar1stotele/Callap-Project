import axios from "axios";
import { API } from "../constants";
import { IUser } from "../models/IUser";

export async function deleteUser(deletedUser: IUser): Promise<IUser[]> {
  return (await axios.post(`${API.url}${API.routes.deleteUser}`, deletedUser)).data;
}
