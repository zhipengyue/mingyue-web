import { Component, OnInit,Input,Output,ViewEncapsulation,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-zpy-tree',
  templateUrl: './zpy-tree.component.html',
  styleUrls: ['./zpy-tree.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class ZpyTreeComponent implements OnInit {
  @Input() DATA:any;
  @Output() onEdit=new EventEmitter();
  @Output() onAdd=new EventEmitter();
  @Output() onDelete=new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  edit(event,DATA,item){
    event.preventDefault();
    this.onEdit.emit({parent:DATA,item:item})
  }
  add(event,DATA,item){
    event.preventDefault();
    this.onAdd.emit({item:item})
  }
  delete(event,DATA,item){
    event.preventDefault();
    this.onDelete.emit({parent:DATA,item:item})
  }
  treeEdit(event){
    this.onEdit.emit(event)
  }
  treeAdd(event){
    this.onAdd.emit(event)
  }
  treeDelete(event){
    this.onDelete.emit(event)
  }
}
