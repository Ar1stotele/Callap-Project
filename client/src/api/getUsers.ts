import axios from "axios";
import { API } from "../constants";
import { IUser } from "../models/IUser";

export async function getUsers(): Promise<IUser[]> {
  return (await axios.get(`${API.url}${API.routes.getUsers}`)).data;
}
