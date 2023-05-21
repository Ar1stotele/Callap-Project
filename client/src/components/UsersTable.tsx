import { useState } from "react";
import { Button, Modal, Table } from "antd";

import { AntTableColumns } from "../models/AntTableColumns";
import { useUsersStore } from "../stores/users";
import { IUser } from "../models/IUser";
import { EditUser } from "./EditUser";

export const UsersTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUser | undefined>();
  const [isUserEdited, setIsUserEdited] = useState(false);
  const users = useUsersStore((state) => state.users);

  const antTableColumnValues = AntTableColumns();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(undefined);
  };

  const handleOk = () => {
    setIsUserEdited(true);
    setSelectedUser(undefined);
  };

  const handleRowDoubleClick = (record: IUser) => {
    showModal();
    setSelectedUser(record);
  };

  const rowProps = (record: IUser) => {
    return {
      onDoubleClick: () => handleRowDoubleClick(record),
    };
  };

  return (
    <>
      <Table
        columns={antTableColumnValues}
        dataSource={users}
        rowKey="id"
        onRow={rowProps}
      />
      {isModalOpen && (
        <Modal
          title="Edit User"
          open={isModalOpen}
          onCancel={closeModal}
          mask={true} // Display mask over the background
          footer={[
            <Button type="primary" onClick={handleOk} key={"save"}>
              Save
            </Button>,
          ]}
        >
          <EditUser
            record={selectedUser}
            isUserEdited={isUserEdited}
            setIsUserEdited={setIsUserEdited}
            setIsModalOpen={setIsModalOpen}
          />
        </Modal>
      )}
    </>
  );
};
