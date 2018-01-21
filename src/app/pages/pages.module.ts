import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component'
// import {LoginComponent} from './auth/login/login.component'
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { ComponentsModule} from '../components/components.module'
const ROUTES: Routes = [
	{
		path:'auth',
		loadChildren:'./auth/auth.module#AuthModule'
  },
  {
		path:'pages',
    component:LayoutComponent,
    children:[
      {
        path:'staff-manage',
        loadChildren:'./staff-manage/staff-manage.module#StaffManageModule'
      },
      {
        path:'department-position',
        loadChildren:'./department-and-position/department-and-position.module#DepartmentAndPositionModule'
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    // ComponentsModule
  ],
  declarations: [LayoutComponent]
})
export class PagesModule { }
