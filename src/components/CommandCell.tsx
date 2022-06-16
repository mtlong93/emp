import { Button } from "@progress/kendo-react-buttons";
import { useEmpStore } from "../utils/EmpStore";
import { Emp } from "../utils/empInterface";
import "@progress/kendo-theme-material";

interface IProperties {
  showDlg: () => void;
  setEmp: (emp: Emp) => void;
  emp: Emp;
}

export const CommandButton = (props: IProperties) => {
  // Emp store
  const { deleteEmp, load } = useEmpStore();

  // Delete employee
  const delEmp = (id: number) => {
    deleteEmp(id);
    load();
  };

  // Main
  return (
    <div>
      <Button
        className="m-1"
        onClick={() => {
          props.showDlg();
          props.setEmp(props.emp);
        }}
        themeColor="warning"
        fillMode="outline"
      >
        Edit
      </Button>
      <Button
        onClick={() => window.confirm("Confirm deleting: " + props.emp.userName) && delEmp(props.emp.id)}
        themeColor="error"
        fillMode="outline"
      >
        Delete
      </Button>
    </div>
  );
};
