import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MasterTableList } from '../service/master-table-list.service';

@Component({
  selector: 'ui-master-table-select',
  templateUrl: './master-table-list.component.html',
  styleUrls: ['./master-table-list.component.scss']
})
export class MasterTableListComponent implements OnInit {

  @Input() value: any;
  @Input() nameValue: string;
  @Output() nameChange = new EventEmitter<string>();
  @Input() errors:string[] =[];
  @Input() keyMasterTable: string;
  @Input() label: string;
  @Input() placeholder: string = '';
  @Input() disabled: boolean = false;
  @Input() multiple: boolean = false;
  @Input() isRequired: boolean= false;
  @Output() valueChange = new EventEmitter<any>();

  items_select:any[];
  constructor(private masterTableList:MasterTableList) { }

  ngOnInit() {
    this.masterTableList.getByMasterList(this.keyMasterTable).subscribe(
      result=>{
        this.items_select=result;
      }
    )
  }

  changeControlEvent(event: any){
    this.valueChange.emit(this.value);
  }

  nameChangeEvent($event){
    this.nameValue=$event;
    this.nameChange.emit($event);
  }
}
