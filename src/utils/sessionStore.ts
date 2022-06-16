import { makeAutoObservable, toJS } from "mobx";
import { useContext, createContext } from "react";
import { Emp } from "./empInterface";

class Session {
    private _user: string = "";
  
    constructor() {
        makeAutoObservable(this);
      }
      
    get user(): string {
      return toJS(this._user);
    }
    
    setSession = (session: string) => {
      console.log("setSession");
      this._user = session;
    };
  }
  // useContext
  const sessionStoreContext = createContext(new Session());
  export const useSessionStore = () => {
    return useContext(sessionStoreContext);
  };