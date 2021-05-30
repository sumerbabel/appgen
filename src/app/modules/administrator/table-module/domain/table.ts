import { DataModel } from '@sharedModule/models-core/data-model';
import { formModel } from '@sharedModule/models-core/form-model';
export class Table extends formModel implements DataModel {

  public _id: string;
  public _code: string;
  private _name: string;
  private _state: string;

  constructor(id: string,code:string, name: string, state: string) {
    super();
    this._id = id;
    this._code = code;
    this._name = name;
    this._state = state;
    this.setOriginalValues(this, ['_id','_code', '_name', '_state']);
  }

  set id(id: string) {
    this._id = id;
  }

  get id(): string {
    return this._id;
  }

  set code(code: string) {
    this._code = code;
  }

  get code(): string {
    return this._code;
  }

  set name(name: string) {
    this._name = name;

    this.code= name.replace(/ /gi,'_').toUpperCase();
  }

  get name(): string {
    return this._name;
  }

  set state(state: string) {
    this._state = state;
  }

  get state(): string {
    return this._state;
  }

  static createTable(object: Object): Table {
    let table: Table = new Table(object['id'],object['code'],  object['name'], object['state']);
    table.updatedAt = object['updated_at'];
    table.isNew = false;
    return table;
  }
  static createTableEmpty(): Table {
    let table: Table = new Table(Table.generateUuid(),undefined, undefined, undefined);
    table.isNew = true;
    return table;
  }
}
