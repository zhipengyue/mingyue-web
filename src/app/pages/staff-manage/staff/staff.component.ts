import { Component, OnInit } from '@angular/core';
import { MultiSearchComponent } from '../../../components/multi-search/multi-search.component'
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {

  constructor(
    public translate:TranslateService
  ) { }
  public multiSearch={
    title:'staff.title',
    items:[
      {
        type:'input|text',
        placehoder:'form.name_tip',
        label:'form.name',//'姓名',
        value:'name'
      },
      {
        type:'input|mobile',
        placehoder:'form.mobile_tip',
        label:'form.mobile',//'手机号',
        value:'mobile'
      },
      {
        type:'select',
        placehoder:'form.position_tip',
        label:'form.position',//'职务',
        value:'position',
        datasource:[],
        apiurl:''
      }
    ]
  }
  public loading:boolean=false;
  public tableParams:any={
    apiurl:'',
    thead:[
      {
        label:'姓名',
        key:'name'
      },
      {
        label:'手机',
        key:'mobile'
      },
      {
        label:'年龄',
        key:'age'
      },
      {
        label:'职位',
        key:'job'
      },
      {
        label:'部门',
        key:'department'
      }
    ],
    datasource:[
      {name:"支鹏越",mobile:'13591253221',age:'32',job:'web前端工程师',department:'web前端开发部门'},
      {name:"支鹏越",mobile:'13591253221',age:'32',job:'web前端工程师',department:'web前端开发部门'},
      {name:"支鹏越",mobile:'13591253221',age:'32',job:'web前端工程师',department:'web前端开发部门'},
      {name:"支鹏越",mobile:'13591253221',age:'32',job:'web前端工程师',department:'web前端开发部门'},
      {name:"支鹏越",mobile:'13591253221',age:'32',job:'web前端工程师',department:'web前端开发部门'},
      {name:"支鹏越",mobile:'13591253221',age:'32',job:'web前端工程师',department:'web前端开发部门'},
      {name:"支鹏越",mobile:'13591253221',age:'32',job:'web前端工程师',department:'web前端开发部门'},
      {name:"支鹏越",mobile:'13591253221',age:'32',job:'web前端工程师',department:'web前端开发部门'}
    ],
    btns:[
      {type:'button|primary',operation:'edit',label:'查看详情',route:''},
      {type:'button|danger',operation:'delete',label:'删除'}
    ]
  };
  
  ngOnInit() {

  }
  onSearch(event){
    
  }
}
