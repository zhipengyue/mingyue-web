import { Injectable } from '@angular/core';
import { RequestService } from '../../services/request.service'
import { Http,Headers,RequestOptions } from '@angular/http';

@Injectable()
export class AuthService extends RequestService {

  constructor(protected http:Http) { 
    super(http);
  }
  login(data){
    return this.jsonCall(data,'http://127.0.0.1:7001/auth/user/login','post')
  }
  regist(data){
    return this.jsonCall(data,'http://127.0.0.1:7001/auth/user/register','post')
  }
  getCaptcha(){
    return this.jsonCall({},'http://127.0.0.1:7001/auth/user/captcha','get')
  }
}
