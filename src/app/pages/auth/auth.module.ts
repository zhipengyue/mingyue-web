import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translate.module'
import { AuthService } from './auth.service'
import { RegisterComponent } from './register/register.component';
import {NzMessageService} from 'ng-zorro-antd';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';


const ROUTES: Routes = [
  {
		path:'',
		redirectTo:'login'
  },
	{
		path:'login',
		component:LoginComponent
  },
  {
		path:'register',
		component:RegisterComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    AppTranslationModule
  ],
  providers:[AuthService,NzMessageService],
  declarations: [LoginComponent, RegisterComponent]
})
export class AuthModule { }
