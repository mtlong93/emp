import { useState } from "react";
import { Form, Field, FormElement, FormRenderProps } from "@progress/kendo-react-form";
import { Button } from "@progress/kendo-react-buttons";
import { Dialog } from "@progress/kendo-react-dialogs";
import { useEmpStore } from "../utils/EmpStore";
import { Emp } from "../utils/empInterface";
import { emailValidator } from "../utils/validation";
import { FormCheckbox, FormComboBox, FormDatePicker, FormInput } from "../utils/formCoponents";
import Moment from "moment";
import { genderData } from "../utils/dataDefault";
import "@progress/kendo-theme-material";

interface IProperties {
  selEmp: Emp;
  showDlg: () => void;
}

export const EditEmp = (props: IProperties) => {
  // Emp store
  const { load, editEmp } = useEmpStore();

  // set data
  const [userName, setUserName] = useState(props.selEmp.userName);
  const [fullName, setName] = useState(props.selEmp.fullName);
  const [gender, setGender] = useState(props.selEmp.gender);
  const [birthday, setBirthday] = useState(Moment(new Date(props.selEmp.birthday)).format("YYYY/MM/DD"));
  const [email, setEmail] = useState(props.selEmp.email);
  const [isAdmin, setIsAdmin] = useState(props.selEmp.isAdmin);

  // handle submit
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const selEmp: Emp = {
      id: props.selEmp.id,
      userName: userName,
      password: props.selEmp.password,
      fullName: fullName,
      gender: gender,
      birthday: birthday,
      email: email,
      isAdmin: isAdmin,
    };
    editEmp(selEmp);
    load();
    props.showDlg();
  };

  // Main
  return (
    <div>
      <Form
        onSubmit={handleSubmit}
        initialValues={{
          id: props.selEmp.id,
          userName: props.selEmp.userName,
          password: props.selEmp.password,
          fullName: props.selEmp.fullName,
          gender: props.selEmp.gender,
          birthday: new Date(props.selEmp.birthday),
          email: props.selEmp.email,
          isAdmin: props.selEmp.isAdmin,
        }}
        render={(formRenderProps: FormRenderProps) => (
          <FormElement style={{ maxWidth: 650 }}>
            <Dialog title={`Edit ${props.selEmp.userName}`} onClose={props.showDlg}>
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
                    name={"fullName"}
                    value={fullName}
                    onChange={(element: any) => setName(element.target.value)}
                    component={FormInput}
                    label={"First name"}
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
                <div className="mb-3">
                  <Field
                    name={"isAdmin"}
                    value={isAdmin}
                    onChange={(element: any) => setIsAdmin(element.target.value)}
                    label={"Admin Permission"}
                    component={FormCheckbox}
                  />
                </div>
              </fieldset>
              <div className="k-form-buttons">
                <Button type={"button"} onClick={props.showDlg}>
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
