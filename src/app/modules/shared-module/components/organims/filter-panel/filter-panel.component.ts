import {  Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { ModelAction } from '@sharedModule/components/molecules/tables/model/action';
import { ActionButton } from '@sharedModule/enums-object/action-button';
import { SearchFilter } from '@sharedModule/components/organims/filter-panel/domain/search-filter';

@Component({
  selector: 'ui-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.scss']
})
export class FilterPanelComponent implements OnInit {

  @Input() searchFilter: SearchFilter;
  @Output() openFilter = new EventEmitter<SearchFilter>();
  @Output() cleartFilter = new EventEmitter<SearchFilter>();

  actionFilter:ModelAction = ActionButton.MINI_FILTER;
  actionClear:ModelAction = ActionButton.MINI_CLEAR;
  constructor() { }

  ngOnInit(): void {
  }

  filterOpen(): void {
    this.openFilter.emit(this.searchFilter)
  }

  filterClear() {
    this.searchFilter.clearFilters();
    this.cleartFilter.emit(this.searchFilter)
  }

}
