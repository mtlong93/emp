import React, { useState } from "react";
import {
  Form,
  Field,
  FormElement,
  FieldRenderProps,
  FormRenderProps,
} from "@progress/kendo-react-form";
import { Error } from "@progress/kendo-react-labels";
import { Input } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogActionsBar,
  DialogCloseEvent,
  Window,
} from "@progress/kendo-react-dialogs";
import { User } from "../utils/user";
import { useUserStore } from "../store";
import {
  FormCheckbox,
  FormComboBox,
  FormDatePicker,
  FormInput,
} from "../utils/formCoponents";
import { emailValidator } from "../utils/validation";
import Moment from 'moment';
import "@progress/kendo-theme-material";

interface IProperties {
  showDlg: () => void;
  mode: string;
}

const genderData = ["Male", "Female"];

export const AddUser = (props: IProperties) => {
  // Store
  const { addUser } = useUserStore();
  // set firstName
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setName] = useState("");
  const [gender, setGender] = useState("");
  const [birthday, setBirthday] = useState(Moment(new Date()).format("YYYY/MM/DD"));
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  // handle submit
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const newUser: User = {
      id: 0,
      userName: userName,
      password: password,
      fullName: fullName,
      gender: gender,
      birthday: birthday,
      email: email,
      isAdmin: isAdmin,
    };
    addUser(newUser);
    props.showDlg();
  };

  // Main
  return (
    <div>
      <Form
        onSubmit={handleSubmit}
        render={(formRenderProps: FormRenderProps) => (
          <FormElement style={{ maxWidth: 650 }}>
            <Dialog title={props.mode} onClose={props.showDlg}>
              <fieldset className={"k-form-fieldset"}>
                <legend className={"k-form-legend"}>
                  Please fill in the fields:
                </legend>
                <div className="mb-3">
                  <Field
                    name={"userName"}
                    value={userName}
                    onChange={(element: any) => setUserName(element.target.value)}
                    component={FormInput}
                    label={"User Name"}
                  />
                </div>
                <div className="mb-3">
                  <Field
                    name={"password"}
                    value={password}
                    onChange={(element: any) => setPassword(element.target.value)}
                    component={FormInput}
                    label={"Password"}
                  />
                </div>
                <div className="mb-3">
                  <Field
                    name={"fullName"}
                    value={fullName}
                    onChange={(element: any) => setName(element.target.value)}
                    component={FormInput}
                    label={"Name"}
                  />
                </div>
                <div className="mb-3">
                  <Field
                    name={"gender"}
                    value={gender}
                    onChange={(element: any) => setGender(element.target.value)}
                    component={FormComboBox}
                    data={genderData}
                    label={"Gender"}
                  />
                </div>
                <div className="mb-3">
                  <Field
                    name={"birthday"}
                    value={birthday}
                    onChange={(element: any) =>
                      setBirthday(element.target.value)
                    }
                    component={FormDatePicker}
                    label={"Birthday"}
                  />
                </div>
                <div className="mb-3">
                  <Field
                    name={"email"}
                    value={email}
                    onChange={(element: any) => setEmail(element.target.value)}
                    component={FormInput}
                    label={"Email"}
                    validator={emailValidator}
                  />
                </div>
                <div className={`mb-3 visibility: ${props.mode === "Add User" ? "visible" : "hidden"}`}>
                  <Field
                    name={"isAdmin"}
                    label={"Admin Permission"}
                    component={FormCheckbox}
                    //validator={termsValidator}
                  />
                </div>
              </fieldset>
              <div className="k-form-buttons">
              <Button
                  type={"button"}
                  onClick={props.showDlg}
                >
                  Cancel
                </Button>
                <Button
                  type={"submit"}
                  onClick={handleSubmit}                  
                  disabled={!formRenderProps.allowSubmit}
                  themeColor="primary"
                >
                  Submit
                </Button>
              </div>
            </Dialog>
          </FormElement>
        )}
      />
    </div>
  );
};
