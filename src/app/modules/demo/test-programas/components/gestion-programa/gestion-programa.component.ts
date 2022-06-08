import { Component, OnInit } from '@angular/core';
import { ModelAction } from '@sharedModule/components/molecules/tables/model/action';
import { ColumnModel } from '@sharedModule/components/molecules/tables/model/column-model';
import { ModalService } from '@sharedModule/components/organims/modal/service/modal.service';
import { ActionButton } from '@sharedModule/enums-object/action-button';
import { ActionGeneric } from '@sharedModule/enums/action-generic.enum';
import { EventAction } from '@sharedModule/models-core/action-model';
import { TableModel } from '@sharedModule/models-core/table-model';
import { Programa } from '../../a-domain/programa';
import { ProgramaDto } from '../../a-domain/programa-dto';
import { CreatePrograma } from '../../b-use-cases/create-programa';
import { GetPrograma } from '../../b-use-cases/get-programa';
import { Filter2Component } from '../filter/filter.component';

@Component({
  templateUrl: './gestion-programa.component.html',
  styleUrls: ['./gestion-programa.component.scss']
})
export class GestionProgramaComponent implements OnInit {

  TITLE_HEADER_FORM = 'Gestión de programas por entidad';
  ACTION_BUTTON_CREATE = ActionButton.CREATE;
  ACTION_BUTTON_SEARCH = ActionButton.MINI_SHOW
  SHOW_CLOSE_BUTTON_FORM = false;
  sistems: any[] = [];

  columnsTable: ColumnModel[] = [
    { key: 'codigoEntidad', title: 'Código entidad' },
    { key: 'entidad', title: 'Entidad ' },
    { key: 'nivelAcademico', title: 'Nivel académico' },
    { key: 'codigo', title: 'Código' },
    { key: 'programa', title: 'Denominación del programa' },
    { key: 'atributoPrograma', title: 'Atributo programa' },
    { key: 'valorAtributo', title: 'Valor atributo' },
    { key: 'abreviatruaPrograma', title: 'Abreviatura programa' },
    { key: 'vigencia', title: 'Vigencia' },
    { key: 'fechaVigencia', title: 'Fecha de vigencia' },
    { key: 'modalidades', title: 'Modalidades' },
    { key: 'fechaRegistro', title: 'Fecha registro' },
    { key: 'action', title: 'Acción', actionColum: true }
  ];

  actionsTable: ModelAction[] = [
    ActionButton.MINI_EDIT,
    ActionButton.MINI_DELETE,
  ];

  tableModelSistem: TableModel = new TableModel(
    this.columnsTable,
    this.actionsTable
  );

  constructor(
    private modalService: ModalService,
    private getPrograma: GetPrograma,
    private createPrograma: CreatePrograma
  ) {
  }

programa: Programa
  ngOnInit(): void {

    this.getSitems();
    this.programa = this.createPrograma.newEmptyPrograma()

  }

  async actionFormEvent($event) {
    switch ($event) {
      case ActionGeneric.SAVE:
      const resultSave= await this.createPrograma.save()
      const resultGet = await this.createSistemOpenModal(this.programa._id)
      console.log({resultSave})
      console.log({resultGet})
        break;
    }
  }

  getSitems() {
    let dataGrilla ={data:[
      {codigoEntidad:'001',entidad:'Universidad General Nacional Mayor',nivelAcademico:'pregrado',codigo:'P001',programa:'Programa superior de administracion 1',atributoPrograma:'Modalidad',valorAtributo:'Presencial',abreviatruaPrograma:'Adultos que trabajan',vigencia:'Vigente', fechaVigencia:'10/01/2021', modalidades:'2',fechaRegistro:'10/01/2022'},
      {codigoEntidad:'002',entidad:'Universidad General Nacional Mayor',nivelAcademico:'pregrado',codigo:'P001',programa:'Programa superior de administracion 1',atributoPrograma:'Modalidad',valorAtributo:'Presencial',abreviatruaPrograma:'Adultos que trabajan',vigencia:'Vigente', fechaVigencia:'10/01/2021', modalidades:'2',fechaRegistro:'10/01/2022'},
      {codigoEntidad:'003',entidad:'Universidad General Nacional Mayor',nivelAcademico:'pregrado',codigo:'P001',programa:'Programa superior de administracion 1',atributoPrograma:'Modalidad',valorAtributo:'Presencial',abreviatruaPrograma:'Adultos que trabajan',vigencia:'Vigente', fechaVigencia:'10/01/2021', modalidades:'2',fechaRegistro:'10/01/2022'},
      {codigoEntidad:'004',entidad:'Universidad General Nacional Mayor',nivelAcademico:'pregrado',codigo:'P001',programa:'Programa superior de administracion 1',atributoPrograma:'Modalidad',valorAtributo:'Presencial',abreviatruaPrograma:'Adultos que trabajan',vigencia:'Vigente', fechaVigencia:'10/01/2021', modalidades:'2',fechaRegistro:'10/01/2022'},
      {codigoEntidad:'005',entidad:'Universidad General Nacional Mayor',nivelAcademico:'pregrado',codigo:'P001',programa:'Programa superior de administracion 1',atributoPrograma:'Modalidad',valorAtributo:'Presencial',abreviatruaPrograma:'Adultos que trabajan',vigencia:'Vigente', fechaVigencia:'10/01/2021', modalidades:'2',fechaRegistro:'10/01/2022'},
      {codigoEntidad:'006',entidad:'Universidad General Nacional Mayor',nivelAcademico:'pregrado',codigo:'P001',programa:'Programa superior de administracion 1',atributoPrograma:'Modalidad',valorAtributo:'Presencial',abreviatruaPrograma:'Adultos que trabajan',vigencia:'Vigente', fechaVigencia:'10/01/2021', modalidades:'2',fechaRegistro:'10/01/2022'},
      {codigoEntidad:'007',entidad:'Universidad General Nacional Mayor',nivelAcademico:'pregrado',codigo:'P001',programa:'Programa superior de administracion 1',atributoPrograma:'Modalidad',valorAtributo:'Presencial',abreviatruaPrograma:'Adultos que trabajan',vigencia:'Vigente', fechaVigencia:'10/01/2021', modalidades:'2',fechaRegistro:'10/01/2022'},
      {codigoEntidad:'008',entidad:'Universidad General Nacional Mayor',nivelAcademico:'pregrado',codigo:'P001',programa:'Programa superior de administracion 1',atributoPrograma:'Modalidad',valorAtributo:'Presencial',abreviatruaPrograma:'Adultos que trabajan',vigencia:'Vigente', fechaVigencia:'10/01/2021', modalidades:'2',fechaRegistro:'10/01/2022'},
      {codigoEntidad:'009',entidad:'Universidad General Nacional Mayor',nivelAcademico:'pregrado',codigo:'P001',programa:'Programa superior de administracion 1',atributoPrograma:'Modalidad',valorAtributo:'Presencial',abreviatruaPrograma:'Adultos que trabajan',vigencia:'Vigente', fechaVigencia:'10/01/2021', modalidades:'2',fechaRegistro:'10/01/2022'},
      {codigoEntidad:'010',entidad:'Universidad General Nacional Mayor',nivelAcademico:'pregrado',codigo:'P001',programa:'Programa superior de administracion 1',atributoPrograma:'Modalidad',valorAtributo:'Presencial',abreviatruaPrograma:'Adultos que trabajan',vigencia:'Vigente', fechaVigencia:'10/01/2021', modalidades:'2',fechaRegistro:'10/01/2022'},
      {codigoEntidad:'011',entidad:'Universidad General Nacional Mayor',nivelAcademico:'pregrado',codigo:'P001',programa:'Programa superior de administracion 1',atributoPrograma:'Modalidad',valorAtributo:'Presencial',abreviatruaPrograma:'Adultos que trabajan',vigencia:'Vigente', fechaVigencia:'10/01/2021', modalidades:'2',fechaRegistro:'10/01/2022'},
      {codigoEntidad:'012',entidad:'Universidad General Nacional Mayor',nivelAcademico:'pregrado',codigo:'P001',programa:'Programa superior de administracion 1',atributoPrograma:'Modalidad',valorAtributo:'Presencial',abreviatruaPrograma:'Adultos que trabajan',vigencia:'Vigente', fechaVigencia:'10/01/2021', modalidades:'2',fechaRegistro:'10/01/2022'},
      {codigoEntidad:'013',entidad:'Universidad General Nacional Mayor',nivelAcademico:'pregrado',codigo:'P001',programa:'Programa superior de administracion 1',atributoPrograma:'Modalidad',valorAtributo:'Presencial',abreviatruaPrograma:'Adultos que trabajan',vigencia:'Vigente', fechaVigencia:'10/01/2021', modalidades:'2',fechaRegistro:'10/01/2022'},
      {codigoEntidad:'015',entidad:'Universidad General Nacional Mayor',nivelAcademico:'pregrado',codigo:'P001',programa:'Programa superior de administracion 1',atributoPrograma:'Modalidad',valorAtributo:'Presencial',abreviatruaPrograma:'Adultos que trabajan',vigencia:'Vigente', fechaVigencia:'10/01/2021', modalidades:'2',fechaRegistro:'10/01/2022'},
      {codigoEntidad:'016',entidad:'Universidad General Nacional Mayor',nivelAcademico:'pregrado',codigo:'P001',programa:'Programa superior de administracion 1',atributoPrograma:'Modalidad',valorAtributo:'Presencial',abreviatruaPrograma:'Adultos que trabajan',vigencia:'Vigente', fechaVigencia:'10/01/2021', modalidades:'2',fechaRegistro:'10/01/2022'},
      {codigoEntidad:'017',entidad:'Universidad General Nacional Mayor',nivelAcademico:'pregrado',codigo:'P001',programa:'Programa superior de administracion 1',atributoPrograma:'Modalidad',valorAtributo:'Presencial',abreviatruaPrograma:'Adultos que trabajan',vigencia:'Vigente', fechaVigencia:'10/01/2021', modalidades:'2',fechaRegistro:'10/01/2022'},
      {codigoEntidad:'018',entidad:'Universidad General Nacional Mayor',nivelAcademico:'pregrado',codigo:'P001',programa:'Programa superior de administracion 1',atributoPrograma:'Modalidad',valorAtributo:'Presencial',abreviatruaPrograma:'Adultos que trabajan',vigencia:'Vigente', fechaVigencia:'10/01/2021', modalidades:'2',fechaRegistro:'10/01/2022'},
      {codigoEntidad:'019',entidad:'Universidad General Nacional Mayor',nivelAcademico:'pregrado',codigo:'P001',programa:'Programa superior de administracion 1',atributoPrograma:'Modalidad',valorAtributo:'Presencial',abreviatruaPrograma:'Adultos que trabajan',vigencia:'Vigente', fechaVigencia:'10/01/2021', modalidades:'2',fechaRegistro:'10/01/2022'},
      {codigoEntidad:'020',entidad:'Universidad General Nacional Mayor',nivelAcademico:'pregrado',codigo:'P001',programa:'Programa superior de administracion 1',atributoPrograma:'Modalidad',valorAtributo:'Presencial',abreviatruaPrograma:'Adultos que trabajan',vigencia:'Vigente', fechaVigencia:'10/01/2021', modalidades:'2',fechaRegistro:'10/01/2022'},
      {codigoEntidad:'021',entidad:'Universidad General Nacional Mayor',nivelAcademico:'pregrado',codigo:'P001',programa:'Programa superior de administracion 1',atributoPrograma:'Modalidad',valorAtributo:'Presencial',abreviatruaPrograma:'Adultos que trabajan',vigencia:'Vigente', fechaVigencia:'10/01/2021', modalidades:'2',fechaRegistro:'10/01/2022'},
      {codigoEntidad:'022',entidad:'Universidad General Nacional Mayor',nivelAcademico:'pregrado',codigo:'P001',programa:'Programa superior de administracion 1',atributoPrograma:'Modalidad',valorAtributo:'Presencial',abreviatruaPrograma:'Adultos que trabajan',vigencia:'Vigente', fechaVigencia:'10/01/2021', modalidades:'2',fechaRegistro:'10/01/2022'},
      {codigoEntidad:'023',entidad:'Universidad General Nacional Mayor',nivelAcademico:'pregrado',codigo:'P001',programa:'Programa superior de administracion 1',atributoPrograma:'Modalidad',valorAtributo:'Presencial',abreviatruaPrograma:'Adultos que trabajan',vigencia:'Vigente', fechaVigencia:'10/01/2021', modalidades:'2',fechaRegistro:'10/01/2022'},
      {codigoEntidad:'024',entidad:'Universidad General Nacional Mayor',nivelAcademico:'pregrado',codigo:'P001',programa:'Programa superior de administracion 1',atributoPrograma:'Modalidad',valorAtributo:'Presencial',abreviatruaPrograma:'Adultos que trabajan',vigencia:'Vigente', fechaVigencia:'10/01/2021', modalidades:'2',fechaRegistro:'10/01/2022'},
      {codigoEntidad:'025',entidad:'Universidad General Nacional Mayor',nivelAcademico:'pregrado',codigo:'P001',programa:'Programa superior de administracion 1',atributoPrograma:'Modalidad',valorAtributo:'Presencial',abreviatruaPrograma:'Adultos que trabajan',vigencia:'Vigente', fechaVigencia:'10/01/2021', modalidades:'2',fechaRegistro:'10/01/2022'}
    ]}



        this.tableModelSistem.setDataTableAndPaginationToResponse(dataGrilla);

  }
  programaDto :ProgramaDto

  async createSistemOpenModal(id:string) {
    this.programaDto =await this.getPrograma.internalExecute(id)
  }

  updateSistemOpenModal(sistem: any): void {

  }

  deleteServiceExecute(sistem: any) {

  }

  tableSistemActions($event: EventAction<any>) {
    switch ($event.action) {
      case ActionGeneric.EDIT:
        this.updateSistemOpenModal($event.dataModel);
        break;

      case ActionGeneric.PAGINATE:
        this.getSitems();
        break;
    }
  }

  filterOpenModal(): void {
    const modalRef = this.modalService.open(
      Filter2Component,
      this.tableModelSistem.searchFilter
    );
    modalRef.onResult().subscribe(() => {
      this.getSitems();
    });
  }

  filterClear() {
    this.getSitems();
  }

ACTION_FORM: ModelAction[] = [ActionButton.SAVE, ActionButton.CANCEL];

}
