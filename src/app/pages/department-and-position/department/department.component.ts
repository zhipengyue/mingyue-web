import { Component, OnInit,ViewEncapsulation} from '@angular/core';
import { MultiSearchComponent } from '../../../components/multi-search/multi-search.component'
// import { ZpyTreeComponent } from '../../../components/zpy-tree/zpy-tree.component'
import { TranslateService } from '@ngx-translate/core';
import {EditComponent} from './edit/edit.component'
import { NzModalService,NzMessageService } from 'ng-zorro-antd';
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
    private departmentService:DepartmentAndPositionService,
    private messageService:NzMessageService
  ) { }

  ngOnInit() {
    this.getList();
  }
  getList(){
    this.departmentService.departmentsGetAll().then((res)=>{
      if (res.status === 200) {
        // this.departmentsData=res.data;
        this.departmentsData=this.departmentService.ArrayToTreeData(res.data)
        console.log(this.departmentsData)
      }
    })
  }
  treeEdit(event){
    console.log(event);

    this.isEditOpen=true;
    this.zpyData={
      title:this.translate.instant('department.pannle.edit'),
      departmentName:event.item.departmentName,
      director:'',
      submit:()=>{
        if(this.zpyData.departmentName!==''){
          let item=event.item;
          item.departmentName=this.zpyData.departmentName;
          this.departmentService.departmentEdit(item).then((res)=>{
            if(res.status===200){
              this.messageService.create('success', this.translate.instant('public.message.add')+this.translate.instant('public.message.success'));
              this.getList();
            }
          },(err)=>{
            console.log(err)
          })
        }
        this.closeEdit(null);
      }
    }
  }
  addRoot(event){
    this.isEditOpen=true;
    this.zpyData={
      title:this.translate.instant('department.pannle.add'),
      departmentName:'',
      director:'',
      submit:()=>{
        if(this.zpyData.departmentName!==''){
          this.departmentService.departmentAdd({departmentName:this.zpyData.departmentName}).then((res)=>{
            if(res.status===200){
              this.messageService.create('success', this.translate.instant('public.message.add')+this.translate.instant('public.message.success'));
              this.getList();
            }
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
      title:this.translate.instant('department.pannle.add'),
      departmentName:'',
      director:'',
      submit:()=>{
        if(this.zpyData.departmentName!==''){
          console.log(event)
          this.departmentService.departmentAdd({parentId:event.item.departmentId,departmentName:this.zpyData.departmentName}).then((res)=>{
            if(res.status===200){
              this.messageService.create('success', this.translate.instant('public.message.add')+this.translate.instant('public.message.success'));
              this.getList();
            }
          },(err)=>{
            console.log(err)
          })
        }
        this.closeEdit(null);
      }
    }
  }
  treeDelete(event){
    this.confirmServ.confirm({
      title: '',
      content: '',
      okText: '',
      onOk() {
        
      }
    });
  }
  closeEdit(event){
    this.isEditOpen=false;
  }
}
