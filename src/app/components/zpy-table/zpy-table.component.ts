import { Component, OnInit,Input,Output} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-zpy-table',
  templateUrl: './zpy-table.component.html',
  styleUrls: ['./zpy-table.component.scss']
})
export class ZpyTableComponent implements OnInit {
  private _DataSource:any;
  @Input() public pageSize:number=10;
  @Input() set DataSource(value){
    this._DataSource=value;
    this._dataSet=this._DataSource.datasource;
  }
  get DataSource():any{
    return this._DataSource;
  }
  constructor(public translate:TranslateService) { }

  ngOnInit() {
    
  }
  _allChecked = false;
  _disabledButton = true;
  _checkedNumber = 0;
  _displayData: Array<any> = [];
  _operating = false;
  _dataSet = [];
  _indeterminate = false;

  _displayDataChange($event) {
    console.log($event);
    this._displayData = $event;
  }

  _refreshStatus() {
    const allChecked = this._displayData.every(value => value.checked === true);
    const allUnChecked = this._displayData.every(value => !value.checked);
    this._allChecked = allChecked;
    this._indeterminate = (!allChecked) && (!allUnChecked);
    this._disabledButton = !this._dataSet.some(value => value.checked);
    this._checkedNumber = this._dataSet.filter(value => value.checked).length;
  }

  _checkAll(value) {
    if (value) {
      this._displayData.forEach(data => data.checked = true);
    } else {
      this._displayData.forEach(data => data.checked = false);
    }
    this._refreshStatus();
  }

  _operateData() {
    this._operating = true;
    setTimeout(_ => {
      this._dataSet.forEach(value => value.checked = false);
      this._refreshStatus();
      this._operating = false;
    }, 1000);
  }
  public getInputType(type){
    return type.split('|');
  }

}
