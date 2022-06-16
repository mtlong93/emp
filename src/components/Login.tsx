import { Button } from "@progress/kendo-react-buttons";
import { Field, Form, FormElement, FormRenderProps } from "@progress/kendo-react-form";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEmpStore } from "../utils/EmpStore";
import { FormInput } from "../utils/formCoponents";
import { useSessionStore } from "../utils/sessionStore";

export const Login = () => {
  const {setSession} = useSessionStore();
  const { emps } = useEmpStore();

  let navigate = useNavigate();

  const [error, setError] = useState("");

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    emps.map((emp) => {
      if (emp.userName === userName && emp.password === password) {
        if (emp.isAdmin) {
          navigate("/admin");
        } else {
          console.log("userName: ", userName);
          setSession(userName);
          navigate("/");          
        }
      } else {
        setError("User name or password is incorrect.");
      }
    });
  };
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
            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign-up for free
            </a>
          </p>
        </div>
        <div className="text-red-600 transition duration-200 ease-in-out">{error}</div>
        <Form
          //onSubmit={handleSubmit}
          render={(formRenderProps: FormRenderProps) => (
            <FormElement style={{ maxWidth: 650 }}>
              <fieldset>
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
              </fieldset>
              <div>
                <Button
                  className="ml-3"
                  type={"button"}
                  onClick={handleSubmit}
                  //disabled={!formRenderProps.allowSubmit}
                  themeColor="primary"
                >
                  Submit
                </Button>
              </div>
            </FormElement>
          )}
        />
      </div>
    </div>
  );
};
