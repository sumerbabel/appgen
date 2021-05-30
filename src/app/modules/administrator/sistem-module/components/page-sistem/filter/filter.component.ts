import { Component, OnInit } from '@angular/core';
import { ModelAction } from '@sharedModule/components/molecules/tables/model/action';
import { SearchFilter } from '@sharedModule/components/organims/filter-panel/domain/search-filter';
import { Modal } from '@sharedModule/components/organims/modal/model/modal.model';
import { ActionButton } from '@sharedModule/enums-object/action-button';
import { ActionGeneric } from '@sharedModule/enums/action-generic.enum';
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent extends Modal implements OnInit {
  TITLE_HEADER_FORM = 'Filtros';
  SHOW_CLOSE_BUTTON_FORM = true;
  ACTION_FORM: ModelAction[] = [
    ActionButton.ACCEPT,
    ActionButton.CANCEL,
    ActionButton.CLEAR,
  ];

  filter = {
    name: { key: 'name', name: 'Nombre', value: null },
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

  ngOnInit(): void {}

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
}
