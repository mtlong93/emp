import { Button } from "@progress/kendo-react-buttons";
import { useUserStore } from "../store";
import { User } from "../utils/user";
import "@progress/kendo-theme-material";

interface IProperties {
  showDlg: () => void;
  setUser: (user: User) => void;
  user: User;
}

export const CommandButton = (props: IProperties) => {
  // User store
  const { deleteUser } = useUserStore();

  // Delete user
  const delUser = (id: number) => {    
    deleteUser(id);
  };

  // Main
  return (
    <div>
      <Button
        className="m-1"
        onClick={() => {
          props.showDlg();
          props.setUser(props.user);
        }}
        themeColor="warning"
        fillMode="outline"
      >
        Edit
      </Button>
      <Button onClick={() => delUser(props.user.id)} themeColor="error" fillMode="outline">
        Delete
      </Button>
    </div>
  );
};
