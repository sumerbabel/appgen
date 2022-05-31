import { Component, OnInit } from '@angular/core';
import { textConvertToTreeObject } from '@sharedModule/code-utils/textConvertToTreeObject';
import { ModelAction } from '@sharedModule/components/molecules/tables/model/action';
import { ColumnModel } from '@sharedModule/components/molecules/tables/model/column-model';
import { ActionButton } from '@sharedModule/enums-object/action-button';
import { ActionGeneric } from '@sharedModule/enums/action-generic.enum';
import { TableModel } from '@sharedModule/models-core/table-model';
import { AlertService } from '../alertForm/service/alert.service';
import { Modal } from '../modal/model/modal.model';

@Component({
  selector: 'ui-text-table-to-array',
  templateUrl: './text-table-to-array.component.html',
  styleUrls: ['./text-table-to-array.component.scss']
})
export class TextTableToArrayComponent extends Modal implements OnInit {

textInput:string
 arrayResult =[]
 
  actions: ModelAction[] = [];
  constructor( private alertService: AlertService) { super() }

  ngOnInit(): void {
    this.actions.push(ActionButton.ACCEPT);
    this.actions.push(ActionButton.CANCEL);
  }

  columnsTable: ColumnModel[] = [];

  actionsTable: ModelAction[] = [
    ActionButton.MINI_EDIT,
    ActionButton.MINI_DELETE,
  ];

  tableResult: TableModel = new TableModel(
    this.columnsTable,
    this.actionsTable
  );
 
  controlChange() {
 
   this.arrayResult =textConvertToTreeObject(this.textInput)
    this.generateTable()
  }

  generateTable(){
    if (this.columnsTable.length ==0){

    
    let listKeysArray= Object.keys(this.arrayResult[0])
    listKeysArray.forEach((value,index)=>{
      let key =0
      if(value=='' ||value==undefined || value==null ){ value = index+''}
       this.columnsTable.push({key: value, title: value})
    })
  }
    this.tableResult.setDataTableAndPaginationToResponse({'data':this.arrayResult})
  }

  controlClear(){
    this.columnsTable =[]
    this.arrayResult=[] 
    this.tableResult.setDataTableAndPaginationToResponse({'data':[]})
    this.textInput='';

  }

  accionFormulario(event) {
    if (event == ActionGeneric.ACCEPT) {
      this.save(this.arrayResult)
    }
    else {
      this.save([])
    }

  }

  modalInput(inputs): void {
  }

  save(data: any): void {
    this.modalClose(data);
  }

}
