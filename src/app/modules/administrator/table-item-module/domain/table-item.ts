import { DataModel } from '@sharedModule/models-core/data-model';
import { formModel } from '@sharedModule/models-core/form-model';
export class TableItem extends formModel implements DataModel {

  public _id: string;
  private _idTable: string;
  private _code: string;
  private _name: string;
  private _order: number;
  private _value: string;
  private _state: string;

  constructor(
    id: string,
    idTable: string,
    code:string,
    name: string,
    value: string,
    order: number,
    state: string
  ) {

    super();
    this._id = id;
    this._idTable = idTable;
    this._code = code;
    this._name = name;
    this._value = value;
    this._order = order;
    this._state = state;

    this.setOriginalValues(this, [
      '_id',
      '_idTable',
      '_code',
      '_name',
      '_value',
      '_order',
      '_state'
    ]);
  }

  set id(id: string) {
    this._id = id;
  }

  get id(): string {
    return this._id;
  }

  set idTable(idTable: string) {
    this._idTable = idTable;
  }

  get idTable(): string {
    return this._idTable;
  }

  set name(name: string) {
    this._name = name;
  }

  set code(code: string) {
    this._code = code;
  }

  get code(): string {
    return this._code;
  }

  get name(): string {
    return this._name;
  }

  set value(value: string) {
    this._value = value;
  }

  get value(): string {
    return this._value;
  }

  set order(order: number) {
    this._order= order;
  }

  get order(): number {
    return this._order;
  }

  set state(state: string) {
    this._state = state;
  }

  get state(): string {
    return this._state;
  }

  static createTableItem(object: Object): TableItem {
    let tableItem: TableItem = new TableItem(
      object['id'],
      object['id_table'],
      object['code'],
      object['name'],
      object['value'],
      object['order'],
      object['state']
    );
    tableItem.updatedAt = object['updated_at'];
    tableItem.isNew = false;
    return tableItem;
  }
  static createTableItemEmpty(): TableItem {
    let tableItem: TableItem = new TableItem(
      TableItem.generateUuid(),
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined
    );
    tableItem.isNew = true;
    return tableItem;
  }
}
