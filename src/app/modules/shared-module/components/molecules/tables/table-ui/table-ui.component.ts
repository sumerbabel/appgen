import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { ActionGeneric } from '@sharedModule/enums/action-generic.enum';
import { EventAction } from '@sharedModule/models-core/action-model';
import { KeyFocus } from '@sharedModule/static-class/key-focus';
import { ModelAction } from '../model/action';
import { ColumnModel } from '../model/column-model';
import { Pagination } from '../model/pagination';
@Component({
  selector: 'ui-table',
  templateUrl: './table-ui.component.html',
  styleUrls: ['./table-ui.component.scss']
})
export class TableUiComponent implements OnInit {

  @Input() columns: ColumnModel[];
  @Input() actions: ModelAction[];
  @Input() templateRow: TemplateRef<any>;
  @Input() viewOrdeColumn: boolean = true;
  @Input() data:any[]=[];
  @Input() paginationData:Pagination;
  @Input() itemsPage:any[]=[1,10,20,30,50,100,500]
  @Input() disabled:boolean = false;
  @Input() errors: string[] =[];
  @Output() actionEvent = new EventEmitter<EventAction<any>>();

  itemPageSelected:any;
  constructor() {}

  ngOnInit(): void {
   if (this.paginationData ==undefined){
   this.paginationData = new Pagination(1,this.data.length,this.data.length,1,1,1,[])
   }
   this.itemPageSelected =this.paginationData.perPage
  }

  indexSelect=null;
  onClickAction(action:string,itemTable:any, indexSelect:any){
    let actionModel :EventAction<any> ={
      action:action,
      dataModel:itemTable
    }
    this.actionEvent.emit(actionModel)
    this.indexSelect =indexSelect;
  }

  onClickPagination(paginateData:any){
    this.paginationData.page=paginateData
    let actionModel :EventAction<any> ={
      action:ActionGeneric.PAGINATE,
      dataModel:this.paginationData
    }
    this.actionEvent.emit(actionModel)
  }

  onClickItemsPage(){
    this.paginationData.setInitialPage()
    let actionModel :EventAction<any> ={
      action:ActionGeneric.PAGINATE,
      dataModel:this.paginationData
    }
    this.actionEvent.emit(actionModel)
  }

  selectColumn:string;
  direction:string ='desc'
  onClickcolumOrder(column:ColumnModel){
    if(column.actionColum!=true){
      if(this.selectColumn===column.key){
        this.directionSwitch()
      } else{
        this.direction='desc'
      }
      this.selectColumn=column.key;
      this.paginationData.order_by=this.selectColumn;
      this.paginationData.order_direction = this.direction

      let actionModel :EventAction<any> ={
        action:ActionGeneric.PAGINATE,
        dataModel:this.paginationData
      }
      this.actionEvent.emit(actionModel)
    }
  }

  directionSwitch(){
    if(this.direction==='desc'){
      this.direction ='asc'
    }else{ this.direction='desc'}
  }

  keyPress($event: any,paginateData:any){
    if ($event.keyCode === 13) {
      this.onClickPagination(paginateData);
  } else{
    KeyFocus.keyDrownToFocus($event);
  }
}

keyPressColumName($event: any,column:ColumnModel){
  if ($event.keyCode === 13) {
    this.onClickcolumOrder(column);
} else{
  KeyFocus.keyDrownToFocus($event);
}
}

}
