import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import md5 from 'blueimp-md5';
import { NzModalService,NzMessageService} from 'ng-zorro-antd';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router'
import { AuthService } from '../auth.service'
import { cookie } from '../../../widget/script/cookie'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private validateForm: FormGroup;
  


  //public translate:TranslateService
  constructor(
    private fb:FormBuilder,
    private confirmServ:NzModalService,
    private translate:TranslateService,
    private router:Router,
    private authService:AuthService,
    private messageService:NzMessageService
  ) { 
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      email: [ null, [ Validators.required ] ],
      password: [ null, [ Validators.required ] ],
      remember: [ true ],
    });
  }
  _submitForm() {
    let invalide=false;
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
      if(this.validateForm.controls[i].status==="INVALID"){
        invalide=true
      }
    }
    
    if(!invalide){
      //submit
      let data=JSON.parse(JSON.stringify(this.validateForm.value));
      console.log(md5)
      let key=this.authService.getMd5Key()
      let password=md5(data.password,key);
      data.password=password;
      delete data.remember;
      //staff-manage
      this.authService.login(data).then(res=>{
        let token=res.headers.get('token');
        if(res.status===200){
          let body=JSON.parse(res._body)
          if(!(body.code&&body.code.needActive)){
            let user=body.user;
            let cookieData={
              token:token,
              user:user
            }
            this.setCookie(cookieData)
            this.messageService.create('success', `登录成功`);
            this.router.navigate(['pages/staff-manage/staff']);
          }else{
            this.messageService.create('success','账户未激活，请激活账户');
            this.router.navigate(['auth/register'],{ queryParams: { id:body.userId } });
          }
        }
      },error=>{
        this.messageService.create('error',error.message);
        if(error.message==='账户未激活'){
          // this.router.navigate(['auth/register'],{ queryParams: { id: 1 } });
        }
      })
    }else{
      
      this.confirmServ.error({
        title: this.translate.instant('login.invalid.modal.title'),//'这是一条失败信息',
        content: this.translate.instant('login.invalid.modal.content')//'一些附加信息一些附加信息一些附加信息'
      });
    }
  }
  setCookie(data){
    //console.log(res.headers.get('content-length'))
    cookie.setCookie('MINGYUE_USER',JSON.stringify(data),24)
  }

}
