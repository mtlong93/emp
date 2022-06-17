import { useState } from "react";
import {
  Grid,
  GridColumn as Column,
  GridCellProps,
  GridSortChangeEvent,
  GridToolbar,
  GridPageChangeEvent,
  GridFilterChangeEvent,
} from "@progress/kendo-react-grid";
import { filterBy, CompositeFilterDescriptor } from "@progress/kendo-data-query";
import { Button } from "@progress/kendo-react-buttons";
import { AddEmp } from "./AddEmp";
import { EditEmp } from "./EditEmp";
import { CommandButton } from "./CommandCell";
import { useEmpStore } from "../utils/empStore";
import { Emp, PageState } from "../utils/interface";
import { observer } from "mobx-react";
import { orderBy, SortDescriptor } from "@progress/kendo-data-query";
import { Link } from "react-router-dom";
import { initPaging } from "../utils/initital";
import "@progress/kendo-theme-material";

// Init Paging
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
  const [sort, setSort] = useState(initialSort);

  // paging
  const [page, setPage] = useState<PageState>(initPaging);
  const pageChange = (event: GridPageChangeEvent) => {
    setPage(event.page);
  };

  //Filter
  const [filter, setFilter] = useState<CompositeFilterDescriptor>();

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
        data={filterBy(orderBy(emps, sort), filter!).slice(page.skip, page.take + page.skip)}
        editField="inEdit"
        //sort
        sortable={true}
        sort={sort}
        onSortChange={(e: GridSortChangeEvent) => {
          setSort(e.sort);
        }}
        //paging
        skip={page.skip}
        take={page.take}
        total={emps.length}
        pageable={true}
        onPageChange={pageChange}
        //filter
        filterable={true}
        filter={filter}
        onFilterChange={(e: GridFilterChangeEvent) => setFilter(e.filter)}
      >
        <GridToolbar>
          <Button onClick={load} themeColor="primary">
            Load Employee
          </Button>
          <Button onClick={() => setshowAddDlg(true)} themeColor="primary">
            Add Employee
          </Button>
        </GridToolbar>

        <Column field="id" title="Id" filterable={false} editable={false} width="80px" />
        <Column field="userName" title="User Name" editable={false} width="180px" />
        <Column field="fullName" title="Name" editable={false} width="250px" />
        <Column field="gender" title="Gender" editable={false} filterable={false} width="120px" />
        <Column field="birthday" title="Birthday" editable={false} filterable={false} width="150px" />
        <Column field="email" title="Email" editable={false} width="300px" />
        <Column field="isAdmin" title="Admin" filterable={false} type="checkbox" editor="boolean" width="120px" />
        <Column cell={EditDelButton} title="Command" editable={false} filterable={false} width="200px" />
      </Grid>

      {showAddDlg && <AddEmp showDlg={() => setshowAddDlg(false)} mode="Add Employee" />}
      {showEditDlg && <EditEmp selEmp={selectedEmp!} showDlg={() => setshowEditDlg(false)} />}
    </div>
  );
});
