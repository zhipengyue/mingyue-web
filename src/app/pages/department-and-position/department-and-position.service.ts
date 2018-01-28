import { Injectable } from '@angular/core';
import { RequestService } from '../../services/request.service'
import { Http,Headers,RequestOptions } from '@angular/http';
import { HttpClient} from '@angular/common/http'
@Injectable()
export class DepartmentAndPositionService extends RequestService {

  constructor(protected http:Http,protected httpClient:HttpClient) { 
    super(http,httpClient);
  }
  departmentAdd(data){
    return this.jsonCall(data,this.path+'department/add','post')
  }
  departmentEdit(data){
    return this.jsonCall(data,this.path+'department/edit','post')
  }
  departmentsGetAll(){
    return this.jsonCall({},this.path+'department/getlist','get')
  }
  departmentDelete(data){
    return this.jsonCall(data,this.path+'department/delete','post')
  }

  //获取职位列表
  positionAdd(data){
    return this.jsonCall(data,this.path+'server/position/add','post')
  }
  positionEdit(data){
    return this.jsonCall(data,this.path+'server/position/edit','post')
  }
  positionDelete(data){
    return this.jsonCall(data,this.path+'server/position/delete','post')
  }
  positionsGetAll(){
    return this.jsonCall({},this.path+'position/getlist','get')
  }


  ArrayToTreeData(arr,key){
    let tree=[];
    for(let i=0;i<arr.length;i++){
      let row=arr[i];
      row.children=[];
      if(!this.haveFather(key,arr,row)){
        //父级
        tree.push(row);
      }
    }
    return tree;
  }
  haveFather(key,arr,child){
    let have=false;
    for(let i=0;i<arr.length;i++){
      let row=arr[i];
      if(row[key]===child.parentId){
        row.children.push(child)
        have=true;
      }
    }
    return have;
  }
}
