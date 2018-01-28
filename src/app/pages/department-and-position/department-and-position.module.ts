import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DepartmentAndPositionService } from './department-and-position.service'
import { DepartmentComponent } from './department/department.component';
import { ComponentsModule} from '../../components/components.module';
import { AppTranslationModule } from '../../app.translate.module';
import { EditComponent } from './edit/edit.component';
import {NzMessageService} from 'ng-zorro-antd';
import { PositionComponent } from './position/position.component';

const ROUTES: Routes = [
	{
		path:'department',
		component:DepartmentComponent
  },
  {
    path:'position',
    component:PositionComponent
  }
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    NgZorroAntdModule,
    FormsModule, 
    ReactiveFormsModule,
    ComponentsModule,
    AppTranslationModule
  ],
  providers:[DepartmentAndPositionService,NzMessageService],
  declarations: [DepartmentComponent,EditComponent,PositionComponent]
})
export class DepartmentAndPositionModule { }
