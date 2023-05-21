import axios from "axios";
import { API } from "../constants";
import { IUser } from "../models/IUser";

interface INewUserId {
  maxId: number;
}

export async function getNewUserId(): Promise<INewUserId> {
  return (await axios.get(`${API.url}${API.routes.getNewUserId}`)).data;
}
