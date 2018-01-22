import { Component, OnInit,ViewEncapsulation} from '@angular/core';
import { MultiSearchComponent } from '../../../components/multi-search/multi-search.component'
// import { ZpyTreeComponent } from '../../../components/zpy-tree/zpy-tree.component'
import { TranslateService } from '@ngx-translate/core';
import {EditComponent} from './edit/edit.component'
import { NzModalService } from 'ng-zorro-antd';
import { DepartmentAndPositionService } from '../department-and-position.service'
@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class DepartmentComponent implements OnInit {
  public zpyData:any={};
  public departmentsData:any=[
    // {
    //   name:'技术部',children:[
    //     {name:'开发部',children:[
    //       {name:'前端组',children:[]},
    //       {name:'后端组',children:[]}
    //     ]},
    //     {name:'测试部',children:[
    //       {name:'python'},
    //       {name:'nodejs'}
    //     ]},
    //     {name:'运维',children:[]},
    //     {name:'IT',children:[]}
    //   ]
    // },
    // {
    //   name:'运营',children:[
    //     {name:'推广',children:[]},
    //     {name:'编辑',children:[]}
    //   ]
    // }
  ]
  public isEditOpen:boolean=false;
  constructor(
    public translate:TranslateService,
    private confirmServ:NzModalService,
    private departmentService:DepartmentAndPositionService
  ) { }

  ngOnInit() {
    this.departmentService.departmentsGetAll().then((res)=>{
      if (res.status === 200) {
        this.departmentsData=res.data;
      }
    })
  }
  treeEdit(event){
    console.log(event);

    this.isEditOpen=true;
    this.zpyData={
      title:'编辑',
      departmentName:event.item.name,
      director:'',
      submit:()=>{
        if(this.zpyData.departmentName!==''){
          event.item.name=this.zpyData.departmentName
        }
        this.closeEdit(null);
      }
    }
  }
  addRoot(event){
    this.isEditOpen=true;
    this.zpyData={
      title:'新增',
      departmentName:'',
      director:'',
      submit:()=>{
        if(this.zpyData.departmentName!==''){
          console.log(event)
          // this.departmentsData.push({
          //   name:this.zpyData.departmentName,
          //   children:[]
          // })
          this.departmentService.departmentAdd({departmentName:this.zpyData.departmentName}).then((res)=>{
            console.log(res);
          },(err)=>{
            console.log(err)
          })
        }
        this.closeEdit(null);
      }
    }
  }
  treeAdd(event){
    this.isEditOpen=true;
    this.zpyData={
      title:'新增',
      departmentName:'',
      director:'',
      submit:()=>{
        if(this.zpyData.departmentName!==''){
          console.log(event)
          event.item.children.push({
            name:this.zpyData.departmentName,
            children:[]
          })
          this.closeEdit(null);
        }
        
      }
    }
  }
  treeDelete(event){
    this.confirmServ.confirm({
      title: '这是一条警告信息',
      content: '一些附加信息一些附加信息一些附加信息',
      okText: '确定',
      onOk() {
        console.log(event)
        for(let i in event.parent){
          if(event.parent[i].name===event.item.name)
          {
            event.parent.splice(i,1);
          }
        }
      }
    });
  }
  closeEdit(event){
    this.isEditOpen=false;
  }
}
