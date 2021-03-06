import { Component, OnInit} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd';
import {NzMessageService} from 'ng-zorro-antd';
import { TranslateService } from '@ngx-translate/core';
import { Router ,ActivatedRoute, Params} from '@angular/router'
import { AuthService } from '../auth.service'
import md5 from 'blueimp-md5';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  private validateForm: FormGroup;
  private captcha={}
  // public agree:boolean;
    //public translate:TranslateService
    constructor(
      private fb:FormBuilder,
      private confirmServ:NzModalService,
      private translate:TranslateService,
      private router:Router,
      private authService:AuthService,
      private messageService:NzMessageService,
      private activatedRoute: ActivatedRoute
    ) { 
    }
  
    ngOnInit() {
      let email="";
      this.validateForm = this.fb.group({
        email            : [ email, [ Validators.email ] ],
        password         : [ null, [ Validators.required, this.isNotSimple] ],
        checkPassword    : [ null, [ Validators.required, this.confirmationValidator ] ]
      });
      // this.getCaptcha(null);

      this.activatedRoute.queryParams.subscribe((params: Params) => {
      let userId = params['id'];
      if(userId){
        this.authService.getAccountById({userId:userId}).then(res=>{
          email=JSON.parse(res._body).email;
          // this.validateForm.value.email=email;
          this.validateForm = this.fb.group({
            email            : [ email, [ Validators.email ] ],
            password         : [ null, [ Validators.required, this.isNotSimple] ],
            checkPassword    : [ null, [ Validators.required, this.confirmationValidator ] ]
          });


        },err=>{
          console.log(err)
        })
      }
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
    // let validataMd5=md5(this.validateForm.value.captcha,this.authService.getMd5Key());
    // if(validataMd5===this.captcha['token']){
    //   let data= {token:this.captcha['token']};
    //   Object.assign(data,this.validateForm.value);
    //    Object.assign(data,{'agree':this.agree});
    //   if(!invalide){
    //     this.authService.regist(data).then(res=>{
    //       this.messageService.create('success', `注册成功`);
    //       this.router.navigate(['auth/login']);
    //     },error=>{
    //       this.confirmServ.error({
    //         title: '错误',//'这是一条失败信息',
    //         content: error.message||error.statusText//'一些附加信息一些附加信息一些附加信息'
    //       });
    //     })
    //     // this.router.navigate(['auth/login']);
    //   }else{
        
    //     this.confirmServ.error({
    //       title: this.translate.instant('login.invalid.modal.title'),//'这是一条失败信息',
    //       content: this.translate.instant('login.invalid.modal.content')//'一些附加信息一些附加信息一些附加信息'
    //     });
    //   }
    // }else{
    //   this.getCaptcha(null);
    // }
    if(!invalide){
      let key=this.authService.getMd5Key()
      this.validateForm.value.password=md5(this.validateForm.value.password,key);
      this.authService.regist(this.validateForm.value).then(res=>{
        this.messageService.create('success', `注册成功`);
        this.router.navigate(['/']);
      },error=>{
        this.confirmServ.error({
          title: '错误',//'这是一条失败信息',
          content: error.message||error.statusText//'一些附加信息一些附加信息一些附加信息'
        });
      })
    }
  }

  updateConfirmValidator() {
    /** wait for refresh value */
    setTimeout(_ => {
      this.validateForm.controls[ 'checkPassword' ].updateValueAndValidity();
    });
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls[ 'password' ].value) {
      return { confirm: true, error: true };
    }
  };
  isNotSimple= (control: FormControl): { [s: string]: boolean } => {
    const reg1=/^[A-Z]{1,}[a-z]{1,}[0-9]{1,}/;
    const reg2=/\w{6,20}/
    if (!control.value) {
      return { required: true };
    } else if (!reg1.test(control.value)||!reg2.test(control.value)) {
      return { valide: true, error: true };
    } 
  }
  getCaptcha(e: MouseEvent=null) {
    if(e) e.preventDefault();
    this.authService.getCaptcha().then(res=>{
      this.captcha = res;
    },error=>{

    })
  }

  getFormControl(name) {
    return this.validateForm.controls[ name ];
  }

}
