import { Component, OnInit } from '@angular/core';
import { ModelAction } from '@sharedModule/components/molecules/tables/model/action';
import { Modal } from '@sharedModule/components/organims/modal/model/modal.model';
import { ActionButton } from '@sharedModule/enums-object/action-button';

@Component({
  selector: 'app-programa-register',
  templateUrl: './programa-register.component.html',
  styleUrls: ['./programa-register.component.scss']
})

export class ProgramaRegisterComponent  extends Modal implements OnInit {
  TITLE_HEADER_FORM = 'Programa';
  SHOW_CLOSE_BUTTON_FORM = true;
  ACTION_FORM: ModelAction[] = [
    ActionButton.PREVIOUS,
    ActionButton.NEXT,
    ActionButton.SAVE,
    ActionButton.CANCEL,
  ];

  DOCUMENTOS_BTN =ActionButton.DOC
  OTRAS_OPCIONES_BTN =ActionButton.CUSTOM_ACTION_C
  modalInput(inputs: any): void {
    console.log(inputs)
  }

  constructor() { super(); }

  ngOnInit() {
    this.OTRAS_OPCIONES_BTN.name='Opciones'
    this.ACTION_FORM[0].isVisible=false
    this.ACTION_FORM[2].isVisible=false
    this.ACTION_FORM[3].isVisible=false
  }

  actionFormEvent($event){
  }

}
