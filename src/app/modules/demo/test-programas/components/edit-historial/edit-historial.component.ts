import { Component, OnInit } from '@angular/core';
import { ModelAction } from '@sharedModule/components/molecules/tables/model/action';
import { ColumnModel } from '@sharedModule/components/molecules/tables/model/column-model';
import { Modal } from '@sharedModule/components/organims/modal/model/modal.model';
import { ActionButton } from '@sharedModule/enums-object/action-button';
import { ActionGeneric } from '@sharedModule/enums/action-generic.enum';
import { TableModel } from '@sharedModule/models-core/table-model';
@Component({
  selector: 'app-edit-historial',
  templateUrl: './edit-historial.component.html',
  styleUrls: ['./edit-historial.component.scss']
})
export class EditHistorialComponent extends Modal implements OnInit {
  TITLE_HEADER_FORM = 'Historial de ediciones';
  SHOW_CLOSE_BUTTON_FORM = true;

  columnsTable: ColumnModel[] = [
    { key: 'modulo', title: 'Módulo' },
    { key: 'opcion', title: 'Opción' },
    { key: 'sub_opciones', title: 'Sub Opciones' },
    { key: 'dato_pincipal', title: 'Dato principal' },
    { key: 'id_edicion', title: 'Nº edición' },
    { key: 'Tipo', title: 'Tipo' },
    { key: 'detalle', title: 'Detalle' },
    { key: 'campo', title: 'Campo' },
    { key: 'valor', title: 'Valor' },
    { key: 'usuario', title: 'Usuario' },
    { key: 'rol_usuario', title: 'Rol usuario' },
    { key: 'fecha', title: 'Fecha_documento' },
    { key: 'fecha_registro', title: 'Fecha cambio' },
    { key: 'Hora', title: 'Hora' },
    { key: 'documentos', title: 'Documentos' },
    { key: 'action', title: 'Acción', actionColum: true }
  ];

  actionsTable: ModelAction[] = [
    ActionButton.MINI_DOCUMENT,
    ActionButton.MINI_EDIT
  ];

  tableModelSistem: TableModel = new TableModel(
    this.columnsTable,
    this.actionsTable
  );

  modalInput(inputs: any): void {
    console.log('')
  }

  constructor() {
    super();
  }

  ngOnInit() {
    this.getSitems()
  }

  getSitems() {
    let dataGrilla = {
      data: [

        {
          modulo: 'Institucional',
          opcion: 'Programas por entidad',
          sub_opciones: 'Datos generales',
          dato_pincipal: 'Entidad central / programa de ciencias',
          id_edicion: '1',
          Tipo: 'Error material',
          detalle: 'Error material al corregir',
          campo: 'Denominación del programa',
          valor: 'Programa de administración',
          usuario: 'Lopez Ramos Ramon',
          rol_usuario: 'Gestor dilic',
          fecha: '26/06/2022',
          fecha_registro: '27/06/2022',
          Hora: '10:43:33',
          documentos: '1'
        },

        {
          modulo: 'Institucional',
          opcion: 'Programas por entidad',
          sub_opciones: 'Datos generales',
          dato_pincipal: 'Entidad central / programa de ciencias',
          id_edicion: '1',
          Tipo: 'Error material',
          detalle: 'Error material al corregir',
          campo: 'Denominación del programa',
          valor: 'Programa de administración',
          usuario: 'Lopez Ramos Ramon',
          rol_usuario: 'Gestor dilic',
          fecha: '26/06/2022',
          fecha_registro: '27/06/2022',
          Hora: '10:43:33',
          documentos: '1'
        },

        {
          modulo: 'Institucional',
          opcion: 'Programas por entidad',
          sub_opciones: 'Datos generales',
          dato_pincipal: 'Entidad central / programa de ciencias',
          id_edicion: '1',
          Tipo: 'Error material',
          detalle: 'Error material al corregir',
          campo: 'Denominación del programa',
          valor: 'Programa de administración',
          usuario: 'Lopez Ramos Ramon',
          rol_usuario: 'Gestor dilic',
          fecha: '26/06/2022',
          fecha_registro: '27/06/2022',
          Hora: '10:43:33',
          documentos: '1'
        },

        {
          modulo: 'Institucional',
          opcion: 'Programas por entidad',
          sub_opciones: 'Datos generales',
          dato_pincipal: 'Entidad central / programa de ciencias',
          id_edicion: '1',
          Tipo: 'Error material',
          detalle: 'Error material al corregir',
          campo: 'Denominación del programa',
          valor: 'Programa de administración',
          usuario: 'Lopez Ramos Ramon',
          rol_usuario: 'Gestor dilic',
          fecha: '26/06/2022',
          fecha_registro: '27/06/2022',
          Hora: '10:43:33',
          documentos: '1'
        },

        {
          modulo: 'Institucional',
          opcion: 'Programas por entidad',
          sub_opciones: 'Datos generales',
          dato_pincipal: 'Entidad central / programa de ciencias',
          id_edicion: '1',
          Tipo: 'Error material',
          detalle: 'Error material al corregir',
          campo: 'Denominación del programa',
          valor: 'Programa de administración',
          usuario: 'Lopez Ramos Ramon',
          rol_usuario: 'Gestor dilic',
          fecha: '26/06/2022',
          fecha_registro: '27/06/2022',
          Hora: '10:43:33',
          documentos: '1'
        },
        {
          modulo: 'Institucional',
          opcion: 'Programas por entidad',
          sub_opciones: 'Datos generales',
          dato_pincipal: 'Entidad central / programa de ciencias',
          id_edicion: '1',
          Tipo: 'Error material',
          detalle: 'Error material al corregir',
          campo: 'Denominación del programa',
          valor: 'Programa de administración',
          usuario: 'Lopez Ramos Ramon',
          rol_usuario: 'Gestor dilic',
          fecha: '26/06/2022',
          fecha_registro: '27/06/2022',
          Hora: '10:43:33',
          documentos: '1'
        },
        {
          modulo: 'Institucional',
          opcion: 'Programas por entidad',
          sub_opciones: 'Datos generales',
          dato_pincipal: 'Entidad central / programa de ciencias',
          id_edicion: '1',
          Tipo: 'Error material',
          detalle: 'Error material al corregir',
          campo: 'Denominación del programa',
          valor: 'Programa de administración',
          usuario: 'Lopez Ramos Ramon',
          rol_usuario: 'Gestor dilic',
          fecha: '26/06/2022',
          fecha_registro: '27/06/2022',
          Hora: '10:43:33',
          documentos: '1'
        }



      ]
    }


    this.tableModelSistem.setDataTableAndPaginationToResponse(dataGrilla);
  }

  actionFormEvent($event) {
    console.log('CLOSE', $event)
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

}
