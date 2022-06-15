import React from "react";
import {
  Grid,
  GridColumn as Column,
  GridToolbar,
  GridCellProps,
  GridSortChangeEvent,
} from "@progress/kendo-react-grid";
import { Button } from "@progress/kendo-react-buttons";
import { AddUser } from "./AddUser";
import { EditUser } from "./EditUser";
import { CommandButton } from "./CommandCell";
import { useUserStore } from "../store";
import { User } from "../utils/user";
import { observer } from "mobx-react";
import "@progress/kendo-theme-material";
import { orderBy, SortDescriptor } from "@progress/kendo-data-query";
import { Label } from "@progress/kendo-react-labels";
import { Link } from "react-router-dom";

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

  const initialSort: Array<SortDescriptor> = [];
  const [sort, setSort] = React.useState(initialSort);

  // Main
  return (
    <div>
      <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl m-8">
        <span className="block xl:inline mr-20">
          <Link to={"/"}><img
            alt="PTN Gblobal"
            className="h-10 w-auto sm:h-20 block xl:inline"
            src="http://intranet.ptnglobalcorp.com/web/image/res.company/1/logo?unique=8ea1c88"
          /></Link>          
        </span>
        <span className="block xl:inline">Employee </span>
        <span className="block text-indigo-600 xl:inline">
          Management System
        </span>
      </h1>
      <Grid
        data={orderBy(users, sort)}
        sortable={true}
        sort={sort}
        onSortChange={(e: GridSortChangeEvent) => {
          setSort(e.sort);
        }}
      >
        <GridToolbar>
          <Button onClick={load} themeColor="primary">
            Load User
          </Button>
          <Button onClick={() => setshowAddDlg(true)} themeColor="primary">
            Add User
          </Button>
        </GridToolbar>

        <Column field="id" title="Id" width="80px" />
        <Column field="userName" title="User Name" width="180px" />
        <Column field="fullName" title="Name" width="250px" />
        <Column field="gender" title="Gender" width="120px" />
        <Column field="birthday" title="Birthday" width="150px" />
        <Column field="email" title="Email" width="300px" />
        <Column field="isAdmin" title="Admin" editor="boolean" width="120px" />
        <Column cell={EditDelButton} title="Command" width="200px" />
      </Grid>

      {showAddDlg && <AddUser showDlg={() => setshowAddDlg(false)} mode="Add User"/>}
      {showEditDlg && (
        <EditUser
          selUser={selectedUser!}
          showDlg={() => setshowEditDlg(false)}
        />
      )}
    </div>
  );
});
