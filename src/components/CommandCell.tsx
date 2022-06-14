import React from "react";
import { Button } from "@progress/kendo-react-buttons";
import { useUserStore } from "../store";
import { User } from "../utils/user";

interface IshowDlg {
  showDlg: () => void;
  setUser: () => void;
  user: User;
}

export const CommandButton = (props: any) => {
  // User store
  const { users, deleteUser } = useUserStore();

  // Delete user
  const delUser = (id: number) => {
    deleteUser(id);
  };

  const mergeFunc = () => {
    props.showDlg();
    props.setUser(props.dataItem);
  };

  // Main
  return (
    <div>
      <Button onClick={() => mergeFunc()}>Edit</Button>
      <Button onClick={() => delUser(props.dataItem.id)}>Delete</Button>
    </div>
  );
};
