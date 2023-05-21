export interface IValidateObject {
  isValid: boolean;
  errorMsg: string;
} 
export const validateEmptyString = (name: string) => {
  const validationObj = {
    isValid: true,
    errorMsg: "",
  };

  if (name?.trim()?.length === 0) {
    validationObj.errorMsg = "Field cannot be empty";
    validationObj.isValid = false;
  }

  return validationObj;
};

export const validateEmail = (email: string) => {
  const validationObj = {
    isValid: true,
    errorMsg: "",
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    validationObj.errorMsg = "Incorrect email format";
    validationObj.isValid = false;
  }

  return validationObj;
};

export const validatePhoneNumber = (phone: string) => {
  const validationObj = {
    isValid: true,
    errorMsg: "",
  };

  const phoneNumberRegex = /^\+\d{1,3}\s\(\d{3}\)\s\d{3}-\d{4}$/;
  if (!phoneNumberRegex.test(phone)) {
    validationObj.errorMsg = "Incorrect phone format";
    validationObj.isValid = false;
  }

  return validationObj;
};

export const checkEmptyString = (name: string) => {
  return name?.trim()?.length === 0;
};

export const checkEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return !emailRegex.test(email);
};

export const checkPhoneNumber = (phone: string) => {
  const phoneNumberRegex = /^\+\d{1,3}\s\(\d{3}\)\s\d{3}-\d{4}$/;
  return !phoneNumberRegex.test(phone);
};
