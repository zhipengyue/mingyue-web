import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  public isCollapsed = false;
  public menu=[
    {
      name: '员工管理',
      icon: 'anticon anticon-team',
      children: [
        {
          name: '员工管理',
          link: '/pages/staff-manage/staff'
        },
        {
          name: '通讯录',
          link: '/pages/staff-manage/contacts'
        }
      ]
    },
    {
      name: '部门&职位',
      icon: 'anticon anticon-shop',
      children: [
        {
          name: '部门管理',
          link: '/pages/department-position/department'
        }
      ]
    }
  ]
  constructor() { }

  ngOnInit() {
  }

}
