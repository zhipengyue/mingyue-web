import { Injectable } from '@angular/core';
import { RequestService } from '../../services/request.service'
import { Http,Headers,RequestOptions } from '@angular/http';
import { HttpClient} from '@angular/common/http'
@Injectable()
export class AuthService extends RequestService {

  constructor(protected http:Http,protected httpClient:HttpClient) { 
    super(http,httpClient);
  }
  login(data){
    return this.jsonCall(data,'http://127.0.0.1:7001/auth/user/login','post',true,false)
  }
  regist(data){
    return this.jsonCall(data,'http://127.0.0.1:7001/auth/user/register','post',false,false)
  }
  getCaptcha(){
    return this.jsonCall({},'http://127.0.0.1:7001/auth/user/captcha','get')
  }
  getAccountById(data){
    return this.jsonCall(data,'http://127.0.0.1:7001/auth/user/getAccountById','post',false,false)
  }
}
