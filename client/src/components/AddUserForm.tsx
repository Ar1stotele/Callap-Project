import { Select } from "antd";
import { SetStateAction, useEffect, useState } from "react";

import { useUsersStore } from "../stores/users";
import { addUser } from "../api/addUser";
import {
  validateEmail,
  validateEmptyString,
  validatePhoneNumber,
} from "../functions/formValidation";
import { getUsers } from "../api/getUsers";
import { getNewUserId } from "../api/getNewUserId";
import { ValidationInput } from "./ValidationInput";
import { IOnInputChange } from "../models/IOnInputChange";
import "./addUserForm.css";

interface IAddUserForm {
  isFormSubmitted: boolean;
  setIsFormSubmitted: (param: SetStateAction<boolean>) => void;
  setIsModalOpen: (param: SetStateAction<boolean>) => void;
}

export const AddUserForm = ({
  isFormSubmitted,
  setIsFormSubmitted,
  setIsModalOpen,
}: IAddUserForm) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [formError, setFormError] = useState("");

  const fetchUsers = useUsersStore((state) => state.fetchUsers);
  

  const onInputChange = (e: IOnInputChange) => {
    const { name, value } = e;

    const obj: any = {
      name: setName,
      email: setEmail,
      street: setStreet,
      city: setCity,
      phone: setPhone,
    };

    obj[name](value);
  };

  const submitHandler = async () => {
    if (!isFormSubmitted) return;
    const newUser = {
      id: 0,
      name,
      email,
      gender,
      address: {
        street,
        city,
      },
      phone,
    };

    const { maxId } = await getNewUserId();
    newUser.id = maxId;

    await addUser(newUser);
    const fetchedUsers = await getUsers();
    fetchUsers(fetchedUsers);
    setIsFormSubmitted(false);
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (isFormSubmitted) {
      (async () => {
        await submitHandler();
      })();
    }
  }, [isFormSubmitted]);

  const handleChange = (value: string) => {
    setGender(value);
  };

  return (
    <div className="form-wrapper">
      <ValidationInput
        inputName="name"
        type="text"
        placeholder="Name"
        validateFunction={validateEmptyString}
        onInputChange={onInputChange}
      />
      <ValidationInput
        inputName="email"
        type="email"
        placeholder="Email"
        validateFunction={validateEmail}
        onInputChange={onInputChange}
      />
      <Select
        defaultValue=""
        style={{ width: "100%" }}
        onChange={handleChange}
        options={[
          { value: "female", label: "female" },
          { value: "male", label: "male" },
        ]}
      />
      <ValidationInput
        inputName="street"
        type="text"
        placeholder="Street"
        validateFunction={validateEmptyString}
        onInputChange={onInputChange}
      />
      <ValidationInput
        inputName="city"
        type="text"
        placeholder="City"
        validateFunction={validateEmptyString}
        onInputChange={onInputChange}
      />
      <ValidationInput
        inputName="phone"
        type="text"
        placeholder="Phone"
        validateFunction={validatePhoneNumber}
        onInputChange={onInputChange}
      />
      {formError.trim().length !== 0 ? (
        <p className="formError">Error: {formError}</p>
      ) : (
        <></>
      )}
    </div>
  );
};
