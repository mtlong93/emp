import React from "react";
import {
  Grid,
  GridColumn as Column,
  GridToolbar,
  GridItemChangeEvent,
  GridCellProps,
} from "@progress/kendo-react-grid";
import { Button } from "@progress/kendo-react-buttons";
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
      <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Employee Management System</h1>
      <Grid data={users}>
        <GridToolbar>
          <Button onClick={load}> Load User </Button>
          <Button onClick={() => setshowAddDlg(true)}> Add User </Button>
        </GridToolbar>
        <Column field="id" title="Id" width="40px"/>
        <Column field="fullName" title="Name" width="150px"/>
        <Column field="female" title="Sex" width="100px"/>
        <Column field="birthday" title="Birthday" width="210px"/>
        <Column field="email" title="Email" width="300px"/>
        <Column cell={EditDelButton} width="100px"/>
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
