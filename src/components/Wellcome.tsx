import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useEmpStore } from "../utils/EmpStore";
import { useSessionStore } from "../utils/sessionStore";
import { AddEmp } from "./AddEmp";

const navigation = [
  { name: "Home", href: "https://www.ptnglobalcorp.com/" },
  { name: "About Us", href: "https://www.ptnglobalcorp.com/about" },
  { name: "Services", href: "https://www.ptnglobalcorp.com/services" },
  { name: "Careers", href: "https://www.ptnglobalcorp.com/careers" },
  { name: "Contect Us", href: "https://www.ptnglobalcorp.com/contact" },
  { name: "Blog", href: "https://www.ptnglobalcorp.com/blog" },
];

export const Wellcome = () => {
  useEffect(() => {
    console.log("useEffect Load");
    load();
  }, []);
  // Show add dialog
  const [showAddDlg, setshowAddDlg] = useState(false);
  const { load } = useEmpStore();
  const { user } = useSessionStore();
  console.log("session: ", user);
  return (
    <div className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <svg
            className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg>

          <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
            <nav className="relative flex items-center justify-between sm:h-10 lg:justify-start" aria-label="Global">
              <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
                <div className="flex items-center justify-between w-full md:w-auto">
                  <Link to={"/admin"}>
                    <span className="sr-only">Workflow</span>
                    <img
                      alt="Workflow"
                      className="h-8 w-auto sm:h-10"
                      src="http://intranet.ptnglobalcorp.com/web/image/res.company/1/logo?unique=8ea1c88"
                    />
                  </Link>
                  <div className="-mr-2 flex items-center md:hidden"></div>
                </div>
              </div>
              <div className="hidden md:block md:ml-10 md:pr-4 md:space-x-8">
                {navigation.map((item) => (
                  <a key={item.name} href={item.href} className="font-medium text-gray-500 hover:text-gray-900">
                    {item.name}
                  </a>
                ))}
              </div>
            </nav>
          </div>
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-10 sm:px-6 md:mt-10 lg:mt-10 lg:px-8 xl:mt-16 xl:mb-16">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">Transform Your Business with</span>
                <span className="block text-indigo-600 mt-3">PTN Staffing</span>
              </h1>
              <p className="mt-6 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-6 md:text-xl lg:mx-0">
                10,000+ companies—from startups to Fortune 500s—use PTN's self-serve platform to build and manage
                business processes across departments. <br />
                Easy to use, easy to customize, and easy to scale.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <Link
                    to={"/login"}
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                  >
                    Login
                  </Link>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <button
                    onClick={() => {
                      setshowAddDlg(true);
                    }}
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>
            {user !== "" && (
              <div>
                <h1 className="text-2xl tracking-tight font-extrabold text-gray-900 sm:text-3xl md:text-3xl mt-3">
                  <span className="block:inline">Wellcome</span>{" "}
                  <span className="block:inline text-indigo-600 mt-3">{user}</span>
                </h1>
                <p className="mt-2 text-base text-red-400 sm:mt-5 sm:text-sm sm:max-w-xl sm:mx-auto md:mt-2 md:text-sm lg:mx-0">
                  You do not have permission to access Employee Management System. Please contact administrator to
                  request access.
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
          src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
          alt=""
        />
      </div>

      {showAddDlg && <AddEmp showDlg={() => setshowAddDlg(false)} mode="Register" />}
    </div>
  );
};
