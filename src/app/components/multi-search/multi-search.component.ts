import { Component, OnInit,ViewEncapsulation,Input,Output,EventEmitter} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-multi-search',
  templateUrl: './multi-search.component.html',
  styleUrls: ['./multi-search.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class MultiSearchComponent implements OnInit {
  @Input() title:string="multiSearch.title";
  @Input() SearchItem:any;
  @Output() onSearch=new EventEmitter<any>();
  constructor(
    public translate:TranslateService
  ) { }

  ngOnInit() {
  }
  searchEvent(event){
    
    let data={};
    this.SearchItem.items.forEach(element => {
      let typeArr=element.type.split('|');
      if(element[element.value]){
        if(typeArr.length>1){
          switch(typeArr[1]){
            case 'number':
              element[element.value]=parseInt(element[element.value]);
            break;
            default:
            break;
          }
        }
        data[element.value]=element[element.value]
      }
    });
    this.onSearch.emit(data);
  }
}
