import { Select } from "antd";
import { SetStateAction, useEffect, useState } from "react";
import "./addUserForm.css";
import {
  checkEmail,
  checkEmptyString,
  checkPhoneNumber,
  validateEmail,
  validateEmptyString,
  validatePhoneNumber,
} from "../functions/formValidation";
import { editUser } from "../api/editUser";
import { useUsersStore } from "../stores/users";
import { getUsers } from "../api/getUsers";
import { IUser } from "../models/IUser";

interface IEditUser {
  record: any;
  setIsUserEdited: (param: SetStateAction<boolean>) => void;
  isUserEdited: boolean;
  setIsModalOpen: (param: SetStateAction<boolean>) => void;
}

export const EditUser = ({
  record,
  isUserEdited,
  setIsUserEdited,
  setIsModalOpen,
}: IEditUser) => {
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [formError, setFormError] = useState("");
  const fetchUsers = useUsersStore((state) => state.fetchUsers);

  useEffect(() => {
    setId(record.id);
    setName(record.name);
    setEmail(record.email);
    setGender(record.gender);
    setCity(record.address.city);
    setStreet(record.address.street);
    setPhone(record.phone);
    setFormError("");
  }, []);

  const submitHandler = async () => {
    if (!isUserEdited) return;
    const editedUser = {
      id,
      name,
      email,
      gender,
      address: {
        street,
        city,
      },
      phone,
    };

    let localErrorChecker = false;

    // validation
    if (checkEmptyString(name)) {
      setFormError("Name field is empty");
      localErrorChecker = true;
    } else if (checkEmail(email)) {
      setFormError("Invalid email format");
      localErrorChecker = true;
    } else if (checkEmptyString(gender)) {
      setFormError("gender is not selected");
      localErrorChecker = true;
    } else if (checkEmptyString(street)) {
      setFormError("Invalid street name");
      localErrorChecker = true;
    } else if (checkEmptyString(city)) {
      setFormError("invalid city name");
      localErrorChecker = true;
    } else if (checkPhoneNumber(phone)) {
      setFormError("Invalid phone number (example - +x (xxx) xxx-xxxx)");
      localErrorChecker = true;
    } else {
      localErrorChecker = false;
      setFormError("");
    }

    if (localErrorChecker) {
      setIsUserEdited(false);
      return;
    }

    await editUser(editedUser);
    const updateUserList = await getUsers();
    fetchUsers(updateUserList);
    setIsUserEdited(false);
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (isUserEdited) {
      (async () => {
        await submitHandler();
      })();
    }
  }, [isUserEdited]);

  const handleChange = (value: string) => {
    setGender(value);
  };

  return (
    <div className="form-wrapper">
      <input
        type="text"
        placeholder="Name"
        id="name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <input
        type="text"
        placeholder="email"
        id="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <Select
        defaultValue={gender || record.gender}
        style={{ width: "100%" }}
        onChange={handleChange}
        options={[
          { value: "female", label: "female" },
          { value: "male", label: "male" },
        ]}
      />
      <input
        type="text"
        placeholder="street"
        id="street"
        value={street}
        onChange={(event) => setStreet(event.target.value)}
      />
      <input
        type="text"
        placeholder="city"
        id="city"
        value={city}
        onChange={(event) => setCity(event.target.value)}
      />
      <input
        type="text"
        placeholder="phone"
        id="phone"
        value={phone}
        onChange={(event) => setPhone(event.target.value)}
      />
      {formError.trim().length !== 0 ? (
        <p className="formError">Error: {formError}</p>
      ) : (
        <></>
      )}
    </div>
  );
};
