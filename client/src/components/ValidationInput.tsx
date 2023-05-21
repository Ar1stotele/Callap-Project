import React, { useEffect, useState } from "react";
import "./addUserForm.css";
import { IValidateObject } from "../functions/formValidation";
import { IOnInputChange } from "../models/IOnInputChange";

interface IValidationInput {
  inputName: string;
  type: string;
  placeholder: string;
  isRequired?: boolean;
  validateFunction: (param: string) => IValidateObject;
  onInputChange: (param: IOnInputChange) => void;
}

export const ValidationInput = (props: IValidationInput) => {
  const [value, setValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const valueChangeHandler = (e: any) => {
    setValue(e.target.value);
  };

  const valueLoseFocusHandler = () => {
    setIsTouched(true);
  };

  useEffect(() => {
    props.onInputChange({ name: props.inputName, value });
  }, [value]);

  const input = props.validateFunction(value);
  const hasErrors = !input.isValid && isTouched;

  return (
    <React.Fragment>
      <input
        name={props.inputName}
        type={props.type}
        placeholder={props.placeholder}
        onChange={valueChangeHandler}
        onBlur={valueLoseFocusHandler}
        className={hasErrors ? "formError" : ""}
        required={props.isRequired}
      />
      {hasErrors && <p className="formError">*{input.errorMsg}</p>}
    </React.Fragment>
  );
};
