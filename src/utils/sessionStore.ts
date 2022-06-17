import { makeAutoObservable, toJS } from "mobx";
import { useContext, createContext } from "react";

class Session {
    private _user: string = "";
  
    constructor() {
        makeAutoObservable(this);
      }
      
    get user(): string {
      return toJS(this._user);
    }
    
    setSession = (session: string) => {
      this._user = session;
    };
  }
  // useContext
  const sessionStoreContext = createContext(new Session());
  export const useSessionStore = () => {
    return useContext(sessionStoreContext);
  };