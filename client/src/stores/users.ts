import { create } from "zustand";
import { IUser } from "../models/IUser";

export const useBearStore = create((set) => ({
  bears: 0,
  increasePopulation: () =>
    set((state: { bears: number }) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}));

interface UsersStoreState {
  users: IUser[];
  fetchUsers: (users: IUser[]) => void;
}
export const useUsersStore = create<UsersStoreState>()((set) => ({
  users: [],
  fetchUsers: (users: IUser[]) =>
    set(() => ({
      users,
    })),
}));
