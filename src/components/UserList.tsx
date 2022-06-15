import React, { useState } from "react";
import {
  Grid,
  GridColumn as Column,
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
import { orderBy, SortDescriptor } from "@progress/kendo-data-query";
import { Link } from "react-router-dom";
import "@progress/kendo-theme-material";

export const UserList = observer(() => {
  const { users, load } = useUserStore();

  // Show add dialog
  const [showAddDlg, setshowAddDlg] = useState(false);

  // Show edit dialog
  const [showEditDlg, setshowEditDlg] = useState(false);

  const [selectedUser, setSelectedUser] = useState<User>();

  interface EditCommandCellProps extends GridCellProps {
    enterEdit: (user: User) => void;
  }
  // Edit & Delete Button
  const EditDelButton = (props: EditCommandCellProps) => (
    <CommandButton user={props.dataItem} showDlg={() => setshowEditDlg(true)} setUser={setSelectedUser}/>
  );

  const initialSort: Array<SortDescriptor> = [];
  const [sort, setSort] = React.useState(initialSort);

  // Main
  return (
    <div>
      <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl m-8">
        <span className="block xl:inline mr-20">
          <Link to={"/"}>
            <img
              alt="PTN Gblobal"
              className="h-10 w-auto sm:h-20 block xl:inline"
              src="http://intranet.ptnglobalcorp.com/web/image/res.company/1/logo?unique=8ea1c88"
            />
          </Link>
        </span>
        <span className="block xl:inline">Employee </span>
        <span className="block text-indigo-600 xl:inline">Management System</span>
      </h1>
      <div className="mt-5 mb-10 ml-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start ">
        <div className="rounded-md shadow">
          <Button onClick={load} themeColor="primary">
            Load User
          </Button>
        </div>
        <div className="mt-3 sm:mt-0 sm:ml-3">
          <Button onClick={() => setshowAddDlg(true)} themeColor="primary">
            Add User
          </Button>
        </div>
      </div>

      <Grid
        data={orderBy(users, sort)}
        sortable={true}
        sort={sort}
        onSortChange={(e: GridSortChangeEvent) => {
          setSort(e.sort);
        }}
      >
        <Column field="id" title="Id" width="80px" />
        <Column field="userName" title="User Name" width="180px" />
        <Column field="fullName" title="Name" width="250px" />
        <Column field="gender" title="Gender" width="120px" />
        <Column field="birthday" title="Birthday" width="150px" />
        <Column field="email" title="Email" width="300px" />
        <Column field="isAdmin" title="Admin" editor="boolean" width="120px" />
        <Column cell={EditDelButton} title="Command" width="200px" />
      </Grid>

      {showAddDlg && <AddUser showDlg={() => setshowAddDlg(false)} mode="Add User" />}
      {showEditDlg && <EditUser selUser={selectedUser!} showDlg={() => setshowEditDlg(false)} />}
    </div>
  );
});
