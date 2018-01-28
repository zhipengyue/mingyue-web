import { Component, OnInit,ViewEncapsulation} from '@angular/core';
import { MultiSearchComponent } from '../../../components/multi-search/multi-search.component'
// import { ZpyTreeComponent } from '../../../components/zpy-tree/zpy-tree.component'
import { TranslateService } from '@ngx-translate/core';
// import {PositionEditComponent} from './position-edit/position.edit.component'
import { EditComponent} from '../edit/edit.component'
import { NzModalService,NzMessageService } from 'ng-zorro-antd';
import { DepartmentAndPositionService } from '../department-and-position.service'
@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class PositionComponent implements OnInit {
  public zpyData:any={};
  public positionsData:any=[
  ]
  public isEditOpen:boolean=false;
  constructor(
    public translate:TranslateService,
    private confirmServ:NzModalService,
    private positionService:DepartmentAndPositionService,
    private messageService:NzMessageService
  ) { }

  ngOnInit() {
    this.getList();
  }
  getList(){
    this.positionService.positionsGetAll().then((res)=>{
      if (res.status === 200) {
        this.positionsData=this.positionService.ArrayToTreeData(res.data,'positionId')
        console.log(res.data,this.positionsData)
      }
    })
  }
  treeEdit(event){
    console.log(event);

    this.isEditOpen=true;
    this.zpyData={
      type:'position',
      title:this.translate.instant('position.pannle.edit'),
      positionName:event.item.positionName,
      director:'',
      submit:()=>{
        if(this.zpyData.positionName!==''){
          let item=event.item;
          item.positionName=this.zpyData.positionName;
          this.positionService.positionEdit(item).then((res)=>{
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
      type:'position',
      title:this.translate.instant('position.pannle.add'),
      positionName:'',
      director:'',
      submit:()=>{
        console.log(this.zpyData)
        if(this.zpyData.positionName!==''){
          this.positionService.positionAdd({positionName:this.zpyData.positionName}).then((res)=>{
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
    console.log(this.zpyData)
  }
  treeAdd(event){
    this.isEditOpen=true;
    this.zpyData={
      type:'position',
      title:this.translate.instant('position.pannle.add'),
      positionName:'',
      director:'',
      submit:()=>{
        if(this.zpyData.positionName!==''){
          console.log(event)
          this.positionService.positionAdd({parentId:event.item.positionId,positionName:this.zpyData.positionName}).then((res)=>{
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
    let that=this;
    this.confirmServ.confirm({
      title: this.translate.instant('position.warning.title'),
      content:this.translate.instant('position.warning.content'),
      okText: this.translate.instant('position.warning.okText'),
      onOk() {
        console.log(event)
        // this.positionService.departmentDelete()
        let item=event.item;
        if(item.children&&item.children.length>0){
          that.isOrNotDeleteTree(event).then(res=>{
            that.ItemDelete(item);
          })
        }else{
          that.ItemDelete(item);
        }
      }
    });
  }
  ItemDelete(item){
    let children=this.treeToArray(item)
    console.log(children)
    this.positionService.positionDelete(children).then(res=>{
      if(res.status===200){
        this.messageService.create('success', this.translate.instant('public.message.delete')+this.translate.instant('public.message.success'));
        this.getList();
      }
    },err=>{
      console.log(err)
    })
  }
  treeToArray(tree){
    let arr=[]
    if(tree.children&&tree.children.length>0){
      for(let i=0;i<tree.children.length;i++){
        let child=tree.children[i]
        arr.push(...this.treeToArray(child))
      }
    }
    arr.push(tree)
    return arr
  }
  isOrNotDeleteTree(event){
    return new Promise((sure,cancel)=>{
      this.confirmServ.confirm({
        title: this.translate.instant('position.warning.title'),
        content:this.translate.instant('position.warning.deleteTree'),
        okText: this.translate.instant('position.warning.okText'),
        onOk() {
          sure();
        },
        onCancel() {
          cancel()
        }
      });
    })
  }
  closeEdit(event){
    this.isEditOpen=false;
  }
}
