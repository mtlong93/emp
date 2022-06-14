import React from "react";
import { Button } from "@progress/kendo-react-buttons";
import store from "../store";
import { User } from "../utils/user";

interface IshowDlg {
  showDlg: () => void;
  setUser: () => void;
  user: User;
}

const deleteUser = (id: number) => {
  store.deleteUser(id);
};

export const CommandCell = (props: any) => {
  const id = props.dataItem.id;
  const showDlg = props.showDlg;
  const setuser = props.setUser(props.dataItem);
  const mergeFunc = () => {
    props.showDlg();
    props.setUser(props.dataItem);
  };
  return (
    <div>
      <Button onClick={() => mergeFunc()}>Edit</Button>
      <Button onClick={() => deleteUser(id)}>Delete</Button>
    </div>
  );
};
