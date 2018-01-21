import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DepartmentComponent } from './department/department.component';
import { ComponentsModule} from '../../components/components.module';
import { AppTranslationModule } from '../../app.translate.module';
import { EditComponent } from './department/edit/edit.component';
const ROUTES: Routes = [
	{
		path:'department',
		component:DepartmentComponent
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
  declarations: [DepartmentComponent, EditComponent]
})
export class DepartmentAndPositionModule { }
