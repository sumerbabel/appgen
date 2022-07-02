import { Component, OnInit } from '@angular/core';
import { ModelAction } from '@sharedModule/components/molecules/tables/model/action';
import { Modal } from '@sharedModule/components/organims/modal/model/modal.model';
import { ModalService } from '@sharedModule/components/organims/modal/service/modal.service';
import { ActionButton } from '@sharedModule/enums-object/action-button';
import { ActionGeneric } from '@sharedModule/enums/action-generic.enum';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { EditHistorialComponent } from '../edit-historial/edit-historial.component';

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
  OPCIONES_EDITAR_BTN ={...ActionButton.CUSTOM_ACTION_B}
  OPCIONES_CAMBIO_DENOMINACION_BTN ={...ActionButton.CUSTOM_ACTION_B}
  OPCIONES_CAMBIO_VIGENCIA_BTN ={...ActionButton.CUSTOM_ACTION_B}
  OPCIONES_HISTORIAL_CAMBIOS_BTN ={...ActionButton.CUSTOM_ACTION_B}
  OPCIONES_HISTORIAL_EDICION_BTN ={...ActionButton.CUSTOM_ACTION_B}
  modalInput(inputs: any): void {
    console.log(inputs)
  }

  constructor(private modalService: ModalService,) { super(); }

  ngOnInit() {
    this.OTRAS_OPCIONES_BTN.name='Opciones'
    this.OPCIONES_CAMBIO_DENOMINACION_BTN.name='Cambio de denominación del programa'
    this.OPCIONES_EDITAR_BTN.name='Editar por error'
    this.OPCIONES_CAMBIO_VIGENCIA_BTN.name='Cambio de vigencia'
    this.OPCIONES_HISTORIAL_CAMBIOS_BTN.name='Ver historial de cambios'
    this.OPCIONES_HISTORIAL_EDICION_BTN.name='Ver Historial de ediciones y modificaciones'
    this.ACTION_FORM[0].isVisible=false
    this.ACTION_FORM[1].isVisible=false

  }

  actionFormEvent($event) {
    switch ($event) {
      case ActionGeneric.ACCEPT:
        this.modalClose({data:'data result'});
        break;
      case ActionGeneric.CANCEL:
        this.modalCancel();
        break;
      case ActionGeneric.CLOSE:
        this.modalCancel();
        break;
    }
  }

  openEditHistorial(){
    const modalRef = this.modalService.open(
      EditHistorialComponent,
      'data'
    );
    modalRef.onResult().subscribe(() => {
      console.log('actions result')
    });

  }

  openEditDialog($event){
    console.log($event)
    const modalRef = this.modalService.open(
      EditDialogComponent,
      'data'
    );
    modalRef.onResult().subscribe(() => {
      console.log('actions result')
    });

  }



}
