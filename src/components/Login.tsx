import { Button } from "@progress/kendo-react-buttons";
import { Field, Form, FormElement, FormRenderProps } from "@progress/kendo-react-form";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEmpStore } from "../utils/empStore";
import { FormInput } from "../utils/formCoponents";
import { useSessionStore } from "../utils/sessionStore";
import { passwordValidator, userNameValidator } from "../utils/validation";

export const Login = () => {
  // Store
  const { emps } = useEmpStore();
  const { setSession } = useSessionStore();

  // Route
  let navigate = useNavigate();

  // Error
  const [error, setError] = useState("");

  // handle
  const handleSubmit = (dataItem: any, event: any) => {
    event.preventDefault();    
    emps.map((emp) => {
      if (emp.userName === dataItem.userName && emp.password === dataItem.password) {
        if (emp.isAdmin) {
          navigate("/admin");
        } else {
          setSession(emp.fullName);
          navigate("/");
        }
      } else {
        setError("User name or password is incorrect.");
      }
    });
  };

  //Main
  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <Link to={"/"}>
            <img
              className="mx-auto h-24 w-auto"
              src="https://static.wixstatic.com/media/7d0992_77d3cefdca69404392f5489b0e911a1f~mv2.png/v1/fill/w_2500,h_1333,al_c/7d0992_77d3cefdca69404392f5489b0e911a1f~mv2.png"
              alt="Workflow"
            />
          </Link>
          <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <p className="inline font-medium text-indigo-600 hover:text-indigo-500">
              Sign-up for free
            </p>
          </p>
        </div>
        <div className="text-red-600 transition duration-200 ease-in-out">{error}</div>
        <Form
          onSubmit={handleSubmit}
          render={(formRenderProps: FormRenderProps) => (
            <FormElement style={{ maxWidth: 650 }}>
              <fieldset>
                <div className="mb-3">
                  <Field
                    name={"userName"}
                    label={"User Name"}
                    component={FormInput}
                    validator={userNameValidator}
                  />
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
              </fieldset>
              <div>
                <Button
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-2"
                  type={"submit"}
                  themeColor="primary"
                  disabled={!formRenderProps.valid}
                >
                  Login
                </Button>
              </div>
            </FormElement>
          )}
        />
      </div>
    </div>
  );
};
