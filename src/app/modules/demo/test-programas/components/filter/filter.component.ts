import { Component, OnInit } from '@angular/core';
import { ModelAction } from '@sharedModule/components/molecules/tables/model/action';
import { SearchFilter } from '@sharedModule/components/organims/filter-panel/domain/search-filter';
import { Modal } from '@sharedModule/components/organims/modal/model/modal.model';
import { ActionButton } from '@sharedModule/enums-object/action-button';
import { ActionGeneric } from '@sharedModule/enums/action-generic.enum';
@Component({
  selector: 'app-filter2',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class Filter2Component extends Modal implements OnInit {
  TITLE_HEADER_FORM = 'Filtros';
  SHOW_CLOSE_BUTTON_FORM = true;
  ACTION_FORM: ModelAction[] = [
    ActionButton.ACCEPT,
    ActionButton.CANCEL,
    ActionButton.CLEAR,
  ];

  listaTiposEntidad =[{id:1,name:'Universidad'}]
  listaDenominacionesEntidades =[{id:1,name:'Universidad'}]
  listaTiposAutorizacionEntidad=[{id:1,name:'Universidad'}]
  listaNivelesAcademicos=[{id:1,name:'Universidad'}]
  listaTiposAutorizacionPrograma=[{id:1,name:'Universidad'}]
  listaDenominacionesPrograma=[{id:1,name:'Universidad'}]
  listaVigencias=[{id:1,name:'Universidad'}]


  filter = {
    tipoEntidad: { key: 'tipoEntidad', name: 'Tipo de entidad', value: ' XUniversidàd ', textValue:'valor inicial' },
    entidad: { key: 'entidad', name: 'Entidad', value: null, textValue:null  },
    tipoAutorizacionEntidad: { key: 'tipoAutorizacionEntidad', name: 'Tipo autorización entidad', value: null, textValue:null  },
    nivelAcademico: { key: 'nivelAcademico', name: 'Nivel académico', value: null, textValue:null  },
    tipoAutorizacionPrograma: { key: 'tipoAutorizacionPrograma', name: 'Tipo de autorización del programa', value: null , textValue:null  },
    programa: { key: 'programa', name: 'Programa', value: null, textValue:null  },
    codigoPrograma: { key: 'codigoPrograma', name: 'Código progama', value: null , textValue:null  },
    vigencia: { key: 'vigencia', name: 'Vigencia', value: null, textValue:null  },
    ofertaActual: { key: 'ofertaActual', name: 'Oferta actual', value: null, textValue:null  },
    name: { key: 'name', name: 'Nombre', value: null , textValue:null },
    updateAtIni: {
      key: 'updated_at_ini',
      name: 'Fecha Registro Inicio',
      value: null,
    },
    updateAtFin: {
      key: 'updated_at_fin',
      name: 'Fecha Registro Fin',
      value: null,
    },
  };

  searchFilter: SearchFilter;
  modalInput(searchFilterInput: SearchFilter): void {
    this.searchFilter = SearchFilter.setFilterToSearchFilter(
      searchFilterInput,
      this.filter
    );
  }

  constructor() {
    super();
  }

  ngOnInit(): void { }

  actionFormEvent($event) {
    switch ($event) {
      case ActionGeneric.ACCEPT:
        this.modalClose(this.searchFilter);
        break;
      case ActionGeneric.CANCEL:
        this.modalCancel();
        break;
      case ActionGeneric.CLOSE:
        this.modalCancel();
        break;
      case ActionGeneric.CLEAR:
        this.searchFilter.clearFilters();
        break;
    }
  }

  isEditMode = true
  editModeAction(){
    this.listaTiposEntidad =[
      {id:1,name:'Universidad'},
      {id:2,name:'Escuela de posgrado'},
      {id:3,name:'Instituto superior'},
      {id:4,name:'Escuela superior'}
    ]
    this.isEditMode = false
  }

}
