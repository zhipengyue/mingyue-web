import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { StaffManageService } from '../staff-manage.service'
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { TranslateService } from '@ngx-translate/core';
import { NzModalService,NzMessageService } from 'ng-zorro-antd';
@Component({
  selector: 'app-add-staff',
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class AddStaffComponent implements OnInit {
  public departmentSelected;
  public departmentOptions = [
    { value: 'jack', label: 'Jack' },
    { value: 'lucy', label: 'Lucy' },
    { value: 'tom', label: 'Tom' }
  ];
  public departments:any=[]
  public positions:any=[]
  public headImg:string=''
  public fullheadImg:string=''
  constructor(
    private fb: FormBuilder,
    public translate:TranslateService,
    private staffService:StaffManageService,
    private confirmServ:NzModalService,
    private messageService:NzMessageService
  ) {
    this.validateForm = this.fb.group({
      avatar              : [this.headImg],
      userName            : [ '', [ Validators.required ], [ this.userNameAsyncValidator ] ],
      // account             : [ '', [ Validators.required ], [ this.userNameAsyncValidator ] ],
      gender              : [ 1 ],
      email               : [ '', [ this.emailValidator ] ],
      phoneNumber               : [ '' ],
      emergencyContacterPhoneNumber: [''],
      departmentId: [ '' ],
      positionId: [ '' ],
      birthDay            : [ '', [ this.birthDayValidator ] ],
      //password            : [ '', [ Validators.required ] ],
      //passwordConfirmation: [ '', [ this.passwordConfirmationValidator ] ],
      //comment             : [ '', [ Validators.required ] ]
    });
  }

  ngOnInit() {
    /**
     * get department list and position list to fill selector
     */
    this.getDepartmentList();
    this.getPositionList();
  }
  getDepartmentList(){
    this.staffService.departmentsGetAll().then(res=>{
      if(res.status===200){
        this.departments=res.data
      }
    },err=>{
      console.log(err)
    })
  }
  getPositionList(){
    this.staffService.positionsGetAll().then(res=>{
      if(res.status===200){
        this.positions=res.data
      }
    },err=>{
      console.log(err)
    })
  }
  uploadClick(event,uploader){
    uploader.click();
  }
  uploadChangeImage(event){
    var file = event.target.files[0];
    if(!/(.jpg$)|(.png$)/.test(file.name)){
      /**
       * jpg png
       */
      this.messageService.create('error','仅支持jpg、png格式的图片');
      return;
    }else if (file.size > 200 * 1024) {
      /**
       * <200Kb
       */
      this.messageService.create('error','图片最大不得超过200k');
      return;
    };

    this.upload(file);
  }
  upload(file){
    console.log(file)
    var formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', file.name);
    formData.append('fileMimeType', file.type);
    this.staffService.uploadImage(formData).then(res=>{
      if(res.status===200){
        this.headImg=res._body;
        this.fullheadImg=this.staffService.path+this.headImg;
        this.messageService.create('success', this.translate.instant('public.message.upload')+this.translate.instant('public.message.success'));
      }
    },err=>{
      console.log(err)
    })
  }
  validateForm: FormGroup;
  submitForm = ($event, value) => {
    $event.preventDefault();
    // for (const key in this.validateForm.controls) {
    //   this.validateForm.controls[ key ].markAsDirty();
    //   console.log(this.validateForm.controls[ key ].valid)
    // }
    if(this.validateForm.valid){
      this.staffService.addStaffInfo(this.validateForm.value).then((res)=>{
        if(res.status===200){
          this.messageService.create('success', this.translate.instant('public.message.add')+this.translate.instant('public.message.success'));
          
        }
      },err=>{
        this.messageService.create('error',err.message);
      })
    }
  };

  resetForm($event: MouseEvent) {
    $event.preventDefault();
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[ key ].markAsPristine();
    }
  }

  validateConfirmPassword() {
    setTimeout(_ => {
      this.validateForm.controls[ 'passwordConfirmation' ].updateValueAndValidity();
    })
  }

  userNameAsyncValidator = (control: FormControl): any => {
    return Observable.create(function (observer) {
      setTimeout(() => {
        if (control.value === 'JasonWood') {
          observer.next({ error: true, duplicated: true });
        } else {
          observer.next(null);
        }
        observer.complete();
      }, 1000);
    });
  };

  getFormControl(name) {
    return this.validateForm.controls[ name ];
  }

  emailValidator = (control: FormControl): { [s: string]: boolean } => {
    const EMAIL_REGEXP = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
    if (!control.value) {
      return { required: true }
    } else if (!EMAIL_REGEXP.test(control.value)) {
      return { error: true, email: true };
    }
  };
  passwordConfirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls[ 'password' ].value) {
      return { confirm: true, error: true };
    }
  };
  birthDayValidator = (control: FormControl): any => {
    if (new Date(control.value) > new Date()) {
      return { expired: true, error: true }
    }
  };
}
