import { Space } from "antd";
import { IUser } from "./IUser";
import { deleteUser } from "../api/deleteUser";
import { getUsers } from "../api/getUsers";
import { useUsersStore } from "../stores/users";

export const AntTableColumns = () => {
  const fetchUsers = useUsersStore((state) => state.fetchUsers);

  const deleteUserHandler = async (deletedUser: IUser) => {
    await deleteUser(deletedUser);
    const updateUserList = await getUsers();
    fetchUsers(updateUserList);
  };

  return [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Street",
      key: "street",
      render: (record: IUser) => record.address.street,
    },
    {
      title: "City",
      key: "city",
      render: (record: IUser) => record.address.city,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: IUser) => (
        <Space size="middle">
          <button
            onClick={() => {
              deleteUserHandler(record);
            }}
          >
            Delete
          </button>
        </Space>
      ),
    },
  ];
};
