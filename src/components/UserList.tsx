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
import { CommandButton } from "./CommandCell";
import { useUserStore } from "../store";
import { User } from "../utils/user";
import { observer } from "mobx-react";

export const UserList = observer(() => {
  const { users, load } = useUserStore();

  // Show add dialog
  const [showAddDlg, setshowAddDlg] = React.useState<boolean>(false);

  // Show edit dialog
  const [showEditDlg, setshowEditDlg] = React.useState<boolean>(false);

  const [selectedUser, setSelectedUser] = React.useState<User>();

  // Edit & Delete Button
  const EditDelButton = (props: GridCellProps) => (
    <CommandButton
      {...props}
      showDlg={() => setshowEditDlg(true)}
      setUser={setSelectedUser}
    />
  );

  // Delete User

  // Main
  return (
    <div>
      <h1>Employee Management System</h1>
      <Grid data={users}>
        <GridToolbar>
          <Button onClick={load}> Load User </Button>
          <Button onClick={() => setshowAddDlg(true)}> Add User </Button>
        </GridToolbar>
        <Column field="id" title="Id" width="50px" />
        <Column field="name" title="Name" />
        <Column cell={EditDelButton} width="240px" />
      </Grid>

      {showAddDlg && <AddUser showDlg={() => setshowAddDlg(false)} />}
      {showEditDlg && (
        <EditUser
          selectedUser={selectedUser}
          showDlg={() => setshowEditDlg(false)}
        />
      )}
    </div>
  );
});
