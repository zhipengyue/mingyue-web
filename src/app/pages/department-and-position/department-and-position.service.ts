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
  departmentEdit(data){
    return this.jsonCall(data,this.path+'department/edit','post')
  }
  departmentsGetAll(){
    return this.jsonCall({},this.path+'department/getlist','get')
  }
  ArrayToTreeData(arr){
    let tree=[];
    for(let i=0;i<arr.length;i++){
      let row=arr[i];
      row.children=[];
      if(!this.haveFather(arr,row)){
        //父级
        tree.push(row);
      }
    }
    return tree;
  }
  haveFather(arr,child){
    let have=false;
    for(let i=0;i<arr.length;i++){
      let row=arr[i];
      if(row.departmentId===child.parentId){
        row.children.push(child)
        have=true;
      }
    }
    return have;
  }
}
