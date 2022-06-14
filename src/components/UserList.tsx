import React from "react";
import {
  Grid,
  GridColumn as Column,
  GridToolbar,
  GridItemChangeEvent,
  GridCellProps,
} from "@progress/kendo-react-grid";
import { Button } from "@progress/kendo-react-buttons";
import "@progress/kendo-theme-default/dist/all.css";
import { AddUser } from "./AddUser";
import { EditUser } from "./EditUser";
import { CommandCell } from "./CommandCell";
import store from "../store";
import { User } from "../utils/user";
import { observer } from "mobx-react";

export const UserList = observer(() => {
  // Load data
  const loadData = () => {
    store.load();
  };

  // Show add dialog
  const [visibleAddDlg, setVisibleAddDlg] = React.useState<boolean>(false);
  const showAddDlg = () => {
    setVisibleAddDlg(!visibleAddDlg);
  };

  // Show edit dialog
  const [visibleEditDlg, setVisibleEditDlg] = React.useState<boolean>(false);
  const showEditDlg = () => {
    setVisibleEditDlg(!visibleEditDlg);
  };

  const [selectedUser, setSelectedUser] = React.useState<User>();
  const setUser = (user: User) => {
    setSelectedUser(user);
  };

  // Edit & Delete Button
  const Command = (props: GridCellProps) => (
    <CommandCell {...props} showDlg={showEditDlg} setUser={setUser} />
  );

  // Delete User

  // Main
  return (
    <div>
      <h1>Employee Management System</h1>
      <Grid data={store.users}>
        <GridToolbar>
          <Button onClick={loadData}> Load User </Button>
          <Button onClick={showAddDlg}> Add User </Button>
        </GridToolbar>
        <Column field="id" title="Id" width="50px" />
        <Column field="name" title="Name" />
        <Column cell={Command} width="240px" />
      </Grid>

      {visibleAddDlg && <AddUser showDlg={showAddDlg} />}
      {visibleEditDlg && <EditUser selectedUser={selectedUser} showDlg={showEditDlg} />}
    </div>
  );
});
