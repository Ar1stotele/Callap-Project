export const tableColumn = [
  {
    title: "Id",
    dataIndex: "Id",
    key: "Id",
  },
  {
    title: "Name",
    dataIndex: "Name",
    key: "Name",
  },
  {
    title: "Email",
    dataIndex: "Email",
    key: "Email",
  },
  {
    title: "Gender",
    dataIndex: "Gender",
    key: "Gender",
  },
  {
    title: "Address",
    dataIndex: "Address",
    key: "Address",
  },
  {
    title: "Phone",
    dataIndex: "Phone",
    key: "Phone",
  },
];

export const API = {
  url: "http://localhost:8000",
  routes: {
    getUsers: "/getUsers",
    addUser: "/addUser",
    deleteUser: "/deleteUser",
    editUser: "/editUser",
    getNewUserId: "/getNewUserId",
  },
};

export const ROUTES = {
  HOME: "/",
  CHART: "/chart",
};
