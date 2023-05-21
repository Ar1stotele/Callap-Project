import axios from "axios";
import { API } from "../constants";
import { IUser } from "../models/IUser";

export async function editUser(editedUser: IUser): Promise<IUser[]> {
  return (await axios.post(`${API.url}${API.routes.editUser}`, editedUser))
    .data;
}
