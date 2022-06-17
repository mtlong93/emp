import { Form, Field, FormElement, FormRenderProps } from "@progress/kendo-react-form";
import { Button } from "@progress/kendo-react-buttons";
import { Dialog } from "@progress/kendo-react-dialogs";
import { useEmpStore } from "../utils/empStore";
import { Emp } from "../utils/interface";
import {
  birthdayValidator,
  emailValidator,
  fullNameValidator,
  genderValidator,
  userNameValidator,
} from "../utils/validation";
import { FormCheckbox, FormComboBox, FormDatePicker, FormInput } from "../utils/formCoponents";
import Moment from "moment";
import { genderData } from "../utils/initital";
import "@progress/kendo-theme-material";

interface IProperties {
  selEmp: Emp;
  showDlg: () => void;
}

export const EditEmp = (props: IProperties) => {
  // Emp store
  const { load, editEmp } = useEmpStore();

  // handle submit
  const handleSubmit = (dataItem: any, event: any) => {
    event.preventDefault();
    const selEmp: Emp = {
      id: props.selEmp.id,
      userName: dataItem.userName,
      password: props.selEmp.password,
      fullName: dataItem.fullName,
      gender: dataItem.gender,
      birthday: Moment(new Date(dataItem.birthday)).format("YYYY/MM/DD"),
      email: dataItem.email,
      isAdmin: dataItem.isAdmin,
    };
    editEmp(selEmp);
    load();
    props.showDlg();
  };

  // Main
  return (
    <div>
      <Dialog title={`Edit ${props.selEmp.userName}`} onClose={props.showDlg}>
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
              <fieldset>
                <legend>Please fill in the fields:</legend>
                <div className="mb-3">
                  <Field name={"userName"} label={"User Name"} component={FormInput} validator={userNameValidator} />
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
                <div className="mb-3">
                  <Field name={"isAdmin"} label={"Admin Permission"} component={FormCheckbox} />
                </div>
              </fieldset>
              <div className="k-form-buttons">
                <Button type={"button"} onClick={props.showDlg}>
                  Cancel
                </Button>
                <Button className="ml-3" type={"submit"} themeColor="primary" disabled={!formRenderProps.valid}>
                  Edit Employee
                </Button>
              </div>
            </FormElement>
          )}
        />
      </Dialog>
    </div>
  );
};
