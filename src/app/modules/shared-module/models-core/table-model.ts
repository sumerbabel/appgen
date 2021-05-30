import { ModelAction } from '@sharedModule/components/molecules/tables/model/action';
import { Column } from '@sharedModule/components/molecules/tables/model/column';
import { ColumnModel } from '@sharedModule/components/molecules/tables/model/column-model';
import { Pagination } from '@sharedModule/components/molecules/tables/model/pagination';
import { SearchFilter } from '@sharedModule/components/organims/filter-panel/domain/search-filter';
export class TableModel {
  private dataModel = [];
  private columns: ColumnModel[] = [];
  private actions: ModelAction[] = [];
  private _pagination: Pagination;
  public _searchFilter: SearchFilter;
  constructor(
    columns: Column[] = [],
    actions: ModelAction[] = [],
    dataModel = [],
    pagination?: Pagination,
    searchFilter?: SearchFilter
  ) {
    this.dataModel = dataModel;
    this.actions = actions;
    this.columns = columns;
    if (pagination) {
      this._pagination = pagination;
    } else {
      this._pagination = new Pagination(1, 0, 0, 10, 0, 0, []);
    }

    if (searchFilter) {
      this._searchFilter = searchFilter;
    } else {
      this._searchFilter = new SearchFilter();
    }
  }

  get pagination(): Pagination {
    return this._pagination;
  }

  set pagination(pagination: Pagination) {
    this._pagination = pagination;
  }

  get searchFilter(): SearchFilter {
    return this._searchFilter;
  }

  set searchFilter(searchFilter: SearchFilter) {
    this._searchFilter = searchFilter;
  }

  setDataTableAndPaginationToResponse(dataResponse: any) {
    if (dataResponse['data']) {
      this.dataModel = dataResponse['data'];
    }
    this._pagination.setPaginationAndDataToResponse(dataResponse);
  }

  get actionArray() {
    return this.actions;
  }

  addAction(action: ModelAction) {
    if (action) {
      this.actions.push(action);
      this.actions = [...this.actions];
    }
  }

  deleteAction(action: string) {
    if (action) {
      const index = this.actions.findIndex(
        (actionItem) => actionItem.action === action
      );
      this.actions.splice(index, 1);
      this.actions = [...this.actions];
    }
  }

  get columnArray() {
    return this.columns;
  }

  addColum(colum: Column) {
    if (colum) {
      this.columns.push(colum);
      this.columns = [...this.columns];
    }
  }

  deleteColumn(keyColum: string) {
    if (keyColum) {
      const index = this.columns.findIndex(
        (columItem) => columItem.key === keyColum
      );
      this.columns.splice(index, 1);
      this.columns = [...this.columns];
    }
  }

  addModel(model: any) {
    if (model) {
      this.dataModel.push(model);
      this.dataModel = [...this.dataModel.reverse()];
    }
  }

  deleteModel(idModel: any) {
    if (idModel) {
      const index = this.dataModel.findIndex(
        (modelDataItem) => modelDataItem._id === idModel._id
      );
      this.dataModel.splice(index, 1);
      this.dataModel = [...this.dataModel];
    }
  }

  updateModel(model: any) {
    if (model) {
      const index = this.dataModel.findIndex(
        (modelDataItem) => modelDataItem._id === model._id
      );
      this.dataModel[index] = model;
      this.dataModel = [...this.dataModel];
    }
  }

  get dataArray() {
    return this.dataModel;
  }

  getParametersQueryString() {
    return {
      ...this.pagination.getObjQueryString(),
      ...this.searchFilter.getObjQueryString(),
    };
  }
}
