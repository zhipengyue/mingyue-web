import { Injectable } from '@angular/core';
import { Http,Headers,RequestOptions } from '@angular/http';
import { UserInfo } from '../common/userInfo';
import { URLSearchParams } from '@angular/http';

@Injectable()
export class RequestService {
  public path:string='';
  constructor(protected http:Http) {

  }
  jsonCall(data:any,url:string,type='post'):any{
    if(type=='get'){
      data={search:this.getParams(data)};
    }
    let options={

    },
        loginInfo=UserInfo.loginInfo;
        if(loginInfo&&data.__isNeedHeader!==false){
          let headers=new Headers();
          headers.append('user_id',loginInfo.user.id);
          headers.append('access_token',loginInfo.user.token);
          options=new RequestOptions({headers:headers});
        }
    return new Promise((resolve,reject)=>{
      if(type==='get'){
        this.http[type](url,options).map(res=>res.json()).subscribe(res=>{
          
          this.processCallback(resolve,reject,res);
          
        },err=>{
          let error={
            status:err.status,
            data:JSON.parse(err._body).data,
            message:JSON.parse(err._body).message,
          }
          this.processCallback(resolve,reject,error);
        })
      }else{
        //post
        console.log(options)
        this.http[type](url,data,options,).subscribe(res=>{
          console.log(res)
          this.processCallback(resolve,reject,res);
        },err=>{
          let error={
            status:err.status,
            data:JSON.parse(err._body).data,
            message:JSON.parse(err._body).message,
          }
          this.processCallback(resolve,reject,error);
        })
      }
    })
  }
  getParams(data:any,isJsonp=false):URLSearchParams{
    let params=new URLSearchParams();
    for(let key in data){
      var val=data[key];
      if(typeof val==='function')continue;
      params.set(key,val);
    }
    if(isJsonp){
      params.set('callback','JSONP_CALLBACK');
    }
    return params;
  }
  processCallback(resolve:Function,reject:Function,data?:any){
    if(data&&data.status===200){
      resolve(data);
    }else{
      reject(data||{'ret':-2000});
    }
  }
  getMd5Key(){
    return 'MINGYUE_2018'
  }
}
