import React, { useEffect, useState } from "react";
import { Grid, GridColumn as Column, GridCellProps, GridSortChangeEvent, GridToolbar } from "@progress/kendo-react-grid";
import { Button } from "@progress/kendo-react-buttons";
import { AddEmp } from "./AddEmp";
import { EditEmp } from "./EditEmp";
import { CommandButton } from "./CommandCell";
import { useEmpStore } from "../utils/EmpStore";
import { Emp } from "../utils/empInterface";
import { observer } from "mobx-react";
import { orderBy, SortDescriptor } from "@progress/kendo-data-query";
import { Link } from "react-router-dom";
import "@progress/kendo-theme-material";

export const EmpList = observer(() => {
  // Employee Store
  const { emps, load } = useEmpStore();

  // Show dialog
  const [showAddDlg, setshowAddDlg] = useState(false);
  const [showEditDlg, setshowEditDlg] = useState(false);

  // Edit & Delete    
  const [selectedEmp, setSelectedEmp] = useState<Emp>();

  const EditDelButton = (props: GridCellProps) => (
    <CommandButton emp={props.dataItem} showDlg={() => setshowEditDlg(true)} setEmp={setSelectedEmp} />
  );

  // Sort grid
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

      <Grid
        data={orderBy(emps, sort)}
        sortable={true}
        sort={sort}
        onSortChange={(e: GridSortChangeEvent) => {
          setSort(e.sort);
        }}
      >
        <GridToolbar>
          <Button onClick={load} themeColor="primary">
            Load Employee
          </Button>

          <Button onClick={() => setshowAddDlg(true)} themeColor="primary">
            Add Employee
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

      {showAddDlg && <AddEmp showDlg={() => setshowAddDlg(false)} mode="Add Employee" />}
      {showEditDlg && <EditEmp selEmp={selectedEmp!} showDlg={() => setshowEditDlg(false)} />}
    </div>
  );
});
