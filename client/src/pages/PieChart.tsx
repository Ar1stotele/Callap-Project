import { useState, useEffect } from "react";
import { Pie } from "@ant-design/plots";
import { useUsersStore } from "../stores/users";
import { Link } from "react-router-dom";
import { ROUTES } from "../constants";
import { getUsers } from "../api/getUsers";

export const PieChart = () => {
  const users = useUsersStore((state) => state.users);
  const fetchUsers = useUsersStore((state) => state.fetchUsers);
  interface CounterObject {
    value: number;
    type: string;
  }
  const [help, setHelp] = useState<CounterObject[]>([]);

  useEffect(() => {
    (async () => {
      const fetchedUsers = await getUsers();
      fetchUsers(fetchedUsers);
    })();
  }, []);

  useEffect(() => {
    let updatedHelp: CounterObject[] = [];
    users.forEach((user) => {
      const ind = updatedHelp.findIndex(
        (city: CounterObject) => city.type === user.address.city
      );
      if (ind !== -1) {
        updatedHelp[ind].value += 1;
      } else {
        updatedHelp.push({
          type: user.address.city,
          value: 1,
        });
      }
    });
    setHelp(updatedHelp);
  }, [users]);

  interface IInt {
    percent: any;
  }
  const config = {
    appendPadding: 10,
    data: help,
    angleField: "value",
    colorField: "type",
    radius: 0.9,
    label: {
      type: "inner",
      offset: "-30%",
      content: ({ percent }: IInt) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: "center",
      },
    },
    interactions: [
      {
        type: "element-active",
      },
    ],
  };
  return (
    <>
      <Link to={ROUTES.HOME}>Go Back</Link>
      <Pie {...(config as any)} />
    </>
  );
};
