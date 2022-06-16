import { useState } from "react";
import { Form, Field, FormElement, FormRenderProps } from "@progress/kendo-react-form";
import { Button } from "@progress/kendo-react-buttons";
import { Dialog } from "@progress/kendo-react-dialogs";
import { Emp } from "../utils/empInterface";

import { FormCheckbox, FormComboBox, FormDatePicker, FormInput } from "../utils/formCoponents";
import { emailValidator } from "../utils/validation";
import Moment from "moment";
import { genderData } from "../utils/dataDefault";
import "@progress/kendo-theme-material";
import { useEmpStore } from "../utils/EmpStore";

interface IProperties {
  showDlg: () => void;
  mode: string;
}

export const AddEmp = (props: IProperties) => {
  // Emp Store
  const { load, addEmp } = useEmpStore();

  // set data
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
    const newEmp: Emp = {
      id: 0,
      userName: userName,
      password: password,
      fullName: fullName,
      gender: gender,
      birthday: birthday,
      email: email,
      isAdmin: isAdmin,
    };
    addEmp(newEmp);
    load();
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
              <fieldset>
                <legend>Please fill in the fields:</legend>
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
                    type="password"
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
                      setBirthday(Moment(new Date(element.target.value)).format("YYYY/MM/DD"))
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
                <div className={`mb-3 visibility: ${props.mode === "Add Employee" ? "visible" : "hidden"}`}>
                  <Field
                    name={"isAdmin"}
                    label={"Admin Permission"}
                    onChange={(element: any) => setIsAdmin(element.target.value)}
                    component={FormCheckbox}
                    //validator={termsValidator}
                  />
                </div>
              </fieldset>
              <div>
                <Button onClick={props.showDlg}>
                  Cancel
                </Button>
                <Button
                  className="ml-3"
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
