import { makeAutoObservable, configure, runInAction, toJS } from "mobx";
import { useContext, createContext } from "react";
import { request } from "./utils/request";
import { User } from "./utils/user";
configure({ enforceActions: "always" });

class UserStore {
  private _users: User[] = [];
  private _error: any;

  constructor() {
    makeAutoObservable(this);
  }

  get users(): User[] {
    return toJS(this._users);
  }

  // Load action
  load = async () => {
    runInAction(() => {
      let that = this;
      request
        .get("User/")
        .then((res) => {
          that._users = res.data;
        })
        .catch((error) => {
          that._error = error.data;
          console.log(error);
        });
    });
  };

  // Add action
  addUser(user: User) {
    request
      .post("User/", user)
      .then((res) => {
        this._users = res.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // Edit action
  editUser(user: User) {
    console.log(user);
    request
      .put("User/" + user.id, user)
      .then((res) => {
        this._users = res.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // Delete action
  deleteUser(id: number) {
    request
      .delete("User/" + id)
      .then((res) => {
        this._users = res.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}

// useContext
const userStoreContext = createContext(new UserStore());
export const useUserStore = () => {
  return useContext(userStoreContext);
};
