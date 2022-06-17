import { Form, Field, FormElement, FormRenderProps } from "@progress/kendo-react-form";
import { Button } from "@progress/kendo-react-buttons";
import { Dialog } from "@progress/kendo-react-dialogs";
import { Emp } from "../utils/interface";
import { FormCheckbox, FormComboBox, FormDatePicker, FormInput } from "../utils/formCoponents";
import {
  birthdayValidator,
  emailValidator,
  fullNameValidator,
  genderValidator,
  passwordValidator,
  userNameValidator,
} from "../utils/validation";
import Moment from "moment";
import { genderData } from "../utils/initital";
import { useEmpStore } from "../utils/empStore";
import "@progress/kendo-theme-material";

interface IProperties {
  showDlg: () => void;
  mode: string;
}

export const AddEmp = (props: IProperties) => {
  // Emp Store
  const { load, addEmp } = useEmpStore();

  // handle submit
  const handleSubmit = (dataItem: any, event: any) => {    
    event.preventDefault();
    const newEmp: Emp = {
      id: 0,
      userName: dataItem.userName,
      password: dataItem.password,
      fullName: dataItem.fullName,
      gender: dataItem.gender,
      birthday: Moment(new Date(dataItem.birthday)).format("YYYY/MM/DD"),
      email: dataItem.email,
      isAdmin: dataItem.isAdmin,
    };
    addEmp(newEmp);
    load();
    props.showDlg();
  };

  // Main
  return (
    <div>
      <Dialog title={props.mode} onClose={props.showDlg}>
        <Form
          onSubmit={handleSubmit}
          render={(formRenderProps: FormRenderProps) => (
            <FormElement style={{ maxWidth: 650 }}>
              <fieldset className={"k-form-fieldset"}>
                <legend>Please fill in the fields:</legend>
                <div className="mb-3">
                  <Field name={"userName"} label={"User Name"} component={FormInput} validator={userNameValidator} />
                </div>
                <div className="mb-3">
                  <Field
                    name={"password"}
                    label={"Password"}
                    component={FormInput}
                    type="password"
                    validator={passwordValidator}
                  />
                </div>
                <div className="mb-3">
                  <Field name={"fullName"} label={"Full Name"} component={FormInput} validator={fullNameValidator} />
                </div>
                <div className="mb-3">
                  <Field
                    name={"gender"}
                    label={"Gender"}
                    component={FormComboBox}
                    data={genderData}
                    validator={genderValidator}
                  />
                </div>
                <div className="mb-3">
                  <Field
                    name={"birthday"}
                    label={"Birthday"}
                    component={FormDatePicker}
                    validator={birthdayValidator}
                  />
                </div>
                <div className="mb-3">
                  <Field name={"email"} label={"Email"} component={FormInput} validator={emailValidator} />
                </div>
                <div className={`mb-3 visibility: ${props.mode === "Add Employee" ? "visible" : "hidden"}`}>
                  <Field name={"isAdmin"} label={"Admin Permission"} component={FormCheckbox} />
                </div>
              </fieldset>
              <div>
                <Button onClick={props.showDlg}>Cancel</Button>
                <Button className="ml-3" type={"submit"} themeColor="primary" disabled={!formRenderProps.valid}>
                  Add Employee
                </Button>
              </div>
            </FormElement>
          )}
        />
      </Dialog>
    </div>
  );
};
