import { makeAutoObservable, configure, runInAction, toJS } from "mobx";
import { useContext, createContext } from "react";
import { request } from "./request";
import { Emp } from "./empInterface";
configure({ enforceActions: "always" });

class EmpStore {
  private _emps: Emp[] = [];
  private _error: any;

  constructor() {
    makeAutoObservable(this);
  }

  get emps(): Emp[] {
    return toJS(this._emps);
  }

  // Load action
  load1 = async () => {
    runInAction(() => {
      let that = this;
      request
        .get("Emp/")
        .then((res) => {
          that._emps = res.data;
        })
        .catch((error) => {
          that._error = error.data;
          console.log(error);
        });
    });
  };

  load = () => {
    request
      .get("Emp/")
      .then((res) => {
        this._emps = res.data;
      })
      .catch((error) => {
        this._error = error.data;
        console.log(error);
      });
  };

  // Add action
  addEmp(emp: Emp) {
    request
      .post("Emp/", emp)
      .then((res) => {
        this._emps = res.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // Edit action
  editEmp(emp: Emp) {
    console.log(emp);
    request
      .put("Emp/" + emp.id, emp)
      .then((res) => {
        this._emps = res.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // Delete action
  deleteEmp(id: number) {
    request
      .delete("Emp/" + id)
      .then((res) => {
        this._emps = res.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}

// useContext
const empStoreContext = createContext(new EmpStore());
export const useEmpStore = () => {
  return useContext(empStoreContext);
};
