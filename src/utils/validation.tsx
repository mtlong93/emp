import { FieldRenderProps } from "@progress/kendo-react-form";
import { Input } from "@progress/kendo-react-inputs";
import { Error } from "@progress/kendo-react-labels";
import { getter } from "@progress/kendo-react-common";

const emailRegex: RegExp = new RegExp(/\S+@\S+\.\S+/);

//-------------Email Validator--------------
export const emailValidator = (value: string) =>
  !value
    ? "Email field is required."
    : emailRegex.test(value)
    ? ""
    : "Email is not in a valid format.";

const userNameGetter = getter("username");
const emailGetter = getter("email");


export const nameValidator = (value: string) =>
  !value
    ? "Full Name is required"
    : value.length < 7
    ? "Full Name should be at least 7 characters long."
    : "";


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
