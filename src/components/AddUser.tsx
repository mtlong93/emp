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
import { FormComboBox, FormDatePicker, FormInput } from "../utils/formCoponents";
import { emailValidator } from "../utils/validation";


interface IshowDlg {
  showDlg: () => void;
}

const genderData = ["Male", "Female"];

export const AddUser = (props: IshowDlg) => {
  // Store
  const { addUser } = useUserStore();
  // set firstName
  const [fullName, setName] = useState("");
  const [female, setFemale] = useState(false);
  const [birthday, setBirthday] = useState(new Date());
  const [email, setEmail] = useState("");

  // handle submit
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const newUser: User = {
      id: 0,
      fullName: fullName,
      female: female,
      birthday: birthday,
      email: email,
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
            <Dialog title={"Add User"} onClose={props.showDlg}>
              <fieldset className={"k-form-fieldset"}>
                <legend className={"k-form-legend"}>
                  Please fill in the fields:
                </legend>
                <div className="mb-3">
                  <Field
                    name={"fullName"}
                    value={fullName}
                    onChange={(element: any) => setName(element.target.value)}
                    component={FormInput}
                    label={"First name"}
                  />
                </div>
                <div className="mb-3">
                  <Field
                    name={"female"}
                    value={female}
                    onChange={(element: any) => setFemale(element.target.value)}
                    component={FormComboBox}
                    data={genderData}
                    label={"Gender"}
                  />
                </div>
                <div className="mb-3">
                  <Field
                    name={"birthday"}
                    value={birthday}
                    onChange={(element: any) => setBirthday(element.target.value)}
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
              </fieldset>
              <div className="k-form-buttons">
                <Button
                  type={"submit"}
                  onClick={handleSubmit}
                  className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
                  disabled={!formRenderProps.allowSubmit}
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
