import { useEffect, useState } from "react";
import { shallow } from "zustand/shallow";
import { Modal, Button } from "antd";

import { useUsersStore } from "../stores/users";
import { getUsers } from "../api/getUsers";
import { UsersTable } from "../components/UsersTable";
import { AddUserForm } from "../components/AddUserForm";
import { Link } from "react-router-dom";
import { ROUTES } from "../constants";
import "./home.css";

export const Home = () => {
  const fetchUsers = useUsersStore((state: any) => state.fetchUsers, shallow);

  useEffect(() => {
    (async () => {
      const fetchedUsers = await getUsers();
      fetchUsers(fetchedUsers);
    })();
  }, []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleOk = () => {
    setIsFormSubmitted(true);
  };

  return (
    <div className="">
      <UsersTable />
      <div className="options">
        <button
          onClick={() => {
            showModal();
          }}
        >
          Add New User
        </button>
        <Link to={ROUTES.CHART}>See Chart</Link>
        <Modal
          title="Add user"
          open={isModalOpen}
          onCancel={closeModal}
          mask={true}
          footer={[
            <Button type="primary" onClick={handleOk} key={"save"}>
              Save
            </Button>,
          ]}
        >
          <AddUserForm
            isFormSubmitted={isFormSubmitted}
            setIsFormSubmitted={setIsFormSubmitted}
            setIsModalOpen={setIsModalOpen}
          />
        </Modal>
      </div>
    </div>
  );
};
