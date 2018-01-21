import { Component, OnInit,Output,EventEmitter,Input } from '@angular/core';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  @Output() close=new EventEmitter();
  @Input() Data:any={};
  constructor() { }

  ngOnInit() {
  }
  closeEvent(event){
    this.close.emit({});
  }

}
