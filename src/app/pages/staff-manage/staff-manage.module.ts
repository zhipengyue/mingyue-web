import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffComponent } from './staff/staff.component';
import { FormerComponent } from './former/former.component';
import { ContactsComponent } from './contacts/contacts.component';
import { Routes, RouterModule } from '@angular/router';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule} from '../../components/components.module';
import { AppTranslationModule } from '../../app.translate.module';
import { AddStaffComponent } from './add-staff/add-staff.component';
import { StaffManageService } from './staff-manage.service'
const ROUTES: Routes = [
	{
		path:'staff',
		component:StaffComponent
  },
  {
		path:'addstaff',
		component:AddStaffComponent
  },
  {
    path:'contacts',
    component:ContactsComponent
  },
  {
    path:'former',
    component:FormerComponent
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
  declarations: [StaffComponent, FormerComponent, ContactsComponent, AddStaffComponent],
  providers:[StaffManageService]
})
export class StaffManageModule { }
