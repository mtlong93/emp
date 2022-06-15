import { useState } from "react";
import { Form, Field, FormElement, FormRenderProps } from "@progress/kendo-react-form";
import { Button } from "@progress/kendo-react-buttons";
import { Dialog } from "@progress/kendo-react-dialogs";
import { useUserStore } from "../store";
import { User } from "../utils/user";
import { emailValidator } from "../utils/validation";
import { FormCheckbox, FormComboBox, FormDatePicker, FormInput } from "../utils/formCoponents";
import Moment from "moment";
import { genderData } from "../utils/dataDefault";
import "@progress/kendo-theme-material";

interface IProperties {
  selUser: User;
  showDlg: () => void;
}

export const EditUser = (props: IProperties) => {
  // User store
  const { load, editUser } = useUserStore();

  // set data
  const [userName, setUserName] = useState(props.selUser.userName);
  //const [password, setPassword] = useState(props.selUser.PName);
  const [fullName, setName] = useState(props.selUser.fullName);
  const [gender, setGender] = useState(props.selUser.gender);
  const [birthday, setBirthday] = useState(Moment(new Date(props.selUser.birthday)).format("YYYY/MM/DD"));
  const [email, setEmail] = useState(props.selUser.email);
  const [isAdmin, setIsAdmin] = useState(props.selUser.isAdmin);

  // handle submit
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const selUser: User = {
      id: props.selUser.id,
      userName: userName,
      password: props.selUser.password,
      fullName: fullName,
      gender: gender,
      birthday: birthday,
      email: email,
      isAdmin: isAdmin,
    };
    editUser(selUser);
    load();
    props.showDlg();
  };

  // Main
  return (
    <div>
      <Form
        onSubmit={handleSubmit}
        initialValues={{
          id: props.selUser.id,
          userName: props.selUser.userName,
          password: props.selUser.password,
          fullName: props.selUser.fullName,
          gender: props.selUser.gender,
          birthday: new Date(props.selUser.birthday),
          email: props.selUser.email,
          isAdmin: props.selUser.isAdmin,
        }}
        render={(formRenderProps: FormRenderProps) => (
          <FormElement style={{ maxWidth: 650 }}>
            <Dialog title={`Edit ${props.selUser.userName}`} onClose={props.showDlg}>
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
                    //validator={termsValidator}
                  />
                </div>
              </fieldset>
              <div className="k-form-buttons">
                <Button className="btnCancel" type={"button"} onClick={props.showDlg}>
                  Cancel
                </Button>
                <Button
                  className="btnSubmit"
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
