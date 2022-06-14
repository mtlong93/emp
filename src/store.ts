import { makeAutoObservable } from "mobx";
import { request } from "./utils/request";
import { User } from "./utils/user";

class Store {
  users: User[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  load() {
    request
      .get("User/")
      .then((res) => {
        this.users = res.data;
      })
      .catch((error) => {
        this.users = error.data;
      })
      .then(function () {
        // always executed
      });
  }

  addUser(user: User) {
    request
      .post("User/", user)
      .then((res) => {
        this.users = res.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  editUser(user: User) {
    console.log(user);
    request
      .put("User/" + user.id, user)
      .then((res) => {
        this.users = res.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  deleteUser(id: number) {
    request
      .delete("User/" + id)
      .then((res) => {
        this.users = res.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}

const store = new Store();
export default store;
