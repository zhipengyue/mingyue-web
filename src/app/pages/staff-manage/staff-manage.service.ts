import { Injectable } from '@angular/core';
import { RequestService } from '../../services/request.service'
import { Http,Headers,RequestOptions } from '@angular/http';
import { HttpClient} from '@angular/common/http'

@Injectable()
export class StaffManageService extends RequestService {
  constructor(protected http:Http,protected httpClient:HttpClient) { 
    super(http,httpClient);
  }
  departmentsGetAll(){
    return this.jsonCall({},this.path+'department/getlist','get')
  }
  positionsGetAll(){
    return this.jsonCall({},this.path+'position/getlist','get')
  }
  uploadImage(data){
    return this.jsonCall(data,this.path+"upload/image",'post')
  }
}
