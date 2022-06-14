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
import "@progress/kendo-theme-default/dist/all.css";
import {
  Dialog,
  DialogActionsBar,
  DialogCloseEvent,
  Window,
} from "@progress/kendo-react-dialogs";
import store from "../store";
import { User } from "../utils/user";
import { values } from "mobx";

interface IshowDlg {
  showDlg: () => void;
}

export const AddUser = (props: IshowDlg) => {
  const [firstName, setName] = useState("");

  const onChange = (element: any) => {
    setName(element.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const newUser: User = {
      id: 0,
      name: firstName,
    };
    store.addUser(newUser);
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
                    name={"firstName"}
                    value={firstName}
                    onChange={onChange}
                    component={Input}
                    label={"First name"}
                  />
                </div>
              </fieldset>
              <div className="k-form-buttons">
                <button
                  type={"submit"}
                  onClick={handleSubmit}
                  className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
                  disabled={!formRenderProps.allowSubmit}
                >
                  Submit
                </button>
              </div>
            </Dialog>
          </FormElement>
        )}
      />
    </div>
  );
};