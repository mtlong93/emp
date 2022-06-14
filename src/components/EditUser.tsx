import React, { useState, useEffect } from "react";
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
import "@progress/kendo-theme-default/dist/all.css";
import {
  Dialog,
  DialogActionsBar,
  DialogCloseEvent,
  Window,
} from "@progress/kendo-react-dialogs";
import { useUserStore } from "../store";
import { User } from "../utils/user";
import { values } from "mobx";

interface IshowDlg {
  showDlg: () => void;
}

export const EditUser = (props: any) => {
  // User store
  const { users, editUser } = useUserStore();

  // set first name
  const [firstName, setName] = useState("");
  const onChange = (element: any) => {
    setName(element.target.value);
  };

  // handle submit
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const selUser: User = {
      id: props.selectedUser.id,
      name: firstName,
    };
    console.log(selUser);
    editUser(selUser);
    props.showDlg();
  };  

  // Main
  return (
    <div>
      <Form
        onSubmit={handleSubmit}
        initialValues={{
          id: props.selectedUser.id,
          firstName: props.selectedUser.name,
        }}
        render={(formRenderProps: FormRenderProps) => (
          <FormElement style={{ maxWidth: 650 }}>
            <Dialog title={"Edit User"} onClose={props.showDlg}>
              <fieldset className={"k-form-fieldset"}>
                <legend className={"k-form-legend"}>
                  Please fill in the fields:
                </legend>
                <div className="mb-3">
                  <Field name={"id"} value={props.selectedUser.id} component={Input} label={"Id"} />
                </div>
                <div className="mb-3">
                  <Field
                    name={"firstName"}
                    //value={props.selectedUser.name}
                    value={firstName}
                    onChange={onChange}
                    component={Input}
                    label={"First name"}
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
