import { Injectable } from '@angular/core';
import { RequestService } from '../../services/request.service'
import { Http,Headers,RequestOptions } from '@angular/http';

@Injectable()
export class DepartmentAndPositionService extends RequestService {

  constructor(protected http:Http) { 
    super(http);
  }
  departmentAdd(data){
    return this.jsonCall(data,this.path+'department/add','post')
  }
  departmentsGetAll(){
    return this.jsonCall({},this.path+'department/getlist','get')
  }
}
