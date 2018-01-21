import { session } from "../widget/script/sessionStorage";
import {keys} from './key'
export class UserInfo{
  private static _userLoginInfo;

  static get loginInfo(){
      if(this._userLoginInfo)return this._userLoginInfo;
      this._userLoginInfo=session.get(keys.userSession);
      return this._userLoginInfo;
  }

  static set loginInfo(value){
      this._userLoginInfo=value;
      session.set(keys.userSession,value);
  }
}