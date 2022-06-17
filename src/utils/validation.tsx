import { getter } from "@progress/kendo-react-common";

const emailRegex: RegExp = new RegExp(/\S+@\S+\.\S+/);

//-------------Email Validator--------------
export const isRequest = (value: string, inputName: string) =>
  !value
    ? {inputName} + " is required"
    : "";

export const userNameValidator = (value: string) =>
  !value
    ? "User Name is required"
    : value.length < 5
    ? "User Name should be at least 7 characters long."
    : value.length > 125
    ? "User Name should be at most 125 characters long."
    : "";
    
export const passwordValidator = (value: string) =>
  !value
    ? "Password is required"
    : value.length < 5 || value.length > 125
    ? "Full Name should be at between 7 and 125 characters long."
    : "";

export const fullNameValidator = (value: string) =>
  !value
    ? "Full name is required"
    : "";

export const genderValidator = (value: string) =>
  !value
    ? "Gender is required"
    : "";

export const birthdayValidator = (value: string) =>
  !value
    ? "Birthday is required"
    : "";

export const emailValidator = (value: string) =>
  !value
    ? "Email field is required."
    : emailRegex.test(value)
    ? ""
    : "Email is not in a valid format.";

const userNameGetter = getter("username");
const emailGetter = getter("email");

export const formValidator = (values: any) => {
  const userName = userNameGetter(values);
  const emailValue = emailGetter(values);

  if (userName && emailValue && emailRegex.test(emailValue)) {
    return {};
  }

  return {
    VALIDATION_SUMMARY: "Please fill in the following fields.",
    "email":
      emailValue && emailRegex.test(emailValue)
        ? ""
        : "Email is required and should be in a valid format.",
  };
};
