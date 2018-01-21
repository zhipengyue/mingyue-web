import { Component, OnInit,Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { RequestService } from '../../services/request.service'
@Component({
  selector: 'app-zpy-input',
  templateUrl: './zpy-input.component.html',
  styleUrls: ['./zpy-input.component.scss']
})
export class ZpyInputComponent implements OnInit {
  private _item:any;
  @Input() set item(value){
    this._item=value;
    if(value.apiurl){
      this.getDataByUrl(value.apiurl);
    }
  }
  get item(){
    return this._item;
  }
  constructor(public translate:TranslateService,private request:RequestService) { 
    // private request:RequestService
  }

  ngOnInit() {
  }
  public getInputType(type){
    return type.split('|');
  }
  getDataByUrl(url){
    if(url){
      this.request.jsonCall({},url,'get').then(res=>{

      },err=>{
        
      })
    }
  }
}
