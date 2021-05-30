import { DataModel } from '@sharedModule/models-core/data-model';
import { ColumnModel } from './column-model';

export class DataTableModel<T extends DataModel> {
    dataModel: T[] = [];
    columns: ColumnModel[] = [];

}