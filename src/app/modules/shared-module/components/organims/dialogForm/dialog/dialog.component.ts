import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Modal } from '../../modal/model/modal.model';
import { DialogInterface } from '../domain/dialog-interface';
import { ModelAction } from '../../../molecules/tables/model/action';
@Component({
  selector: 'ui-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class DialogComponent extends Modal implements OnInit {
  dataDialog: DialogInterface;
  constructor() { super() }
  actions :ModelAction[] =[];
  top:string ='';
  left:string='';
  ngOnInit(): void {
    let action_yes ={
      name: '  Si',
      action:'YES',
      type:'1',
      icon:'YES',
      color: 'rgb(26, 98, 77)',
      colorText:'#c9c9c9',
      autoFocus:true,
      styleClass:['ui-default']
    }

    let action_no ={
      name: '  No  ',
      action:'NO',
      type:'1',
      icon:'YES',
      color: 'rgb(58, 74, 83)',
      colorText:'#c9c9c9',
      styleClass:['ui-default']
    }

    this.actions.push(action_yes);
    this.actions.push(action_no);
  }

  accionFormulario(event) {
   this.save(event)
  }

  modalInput(inputs): void {
    this.dataDialog = inputs.dataDialog;
    this.dataDialog.buttons =this.actions;
  }

  save(data: any): void {
    this.modalClose(data);
  }

}
