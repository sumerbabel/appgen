import { DataModel } from '@sharedModule/models-core/data-model';
import { formModel } from '@sharedModule/models-core/form-model';
export class Module extends formModel implements DataModel {
  public _id: string;
  private _idSistem: string;
  private _name: string;
  constructor(id: string, idSistem: string, name: string) {
    super();
    this._id = id;
    this._idSistem = idSistem;
    this._name = name;
    this.setOriginalValues(this, ['_id', '_idSistem', '_name']);
  }
  set id(id: string) {
    this._id = id;
  }
  get id(): string {
    return this._id;
  }
  set idSistem(idSistem: string) {
    this._idSistem = idSistem;
  }
  get idSistem(): string {
    return this._idSistem;
  }
  set name(name: string) {
    this._name = name;
  }
  get name(): string {
    return this._name;
  }
  static createModule(object: Object): Module {
    let module: Module = new Module(
      object['id'],
      object['id_sistem'],
      object['name']
    );
    module.updatedAt = object['updated_at'];
    module.isNew = false;
    return module;
  }
  static createModuleEmpty(): Module {
    let module: Module = new Module(
      Module.generateUuid(),
      undefined,
      undefined
    );
    module.isNew = true;
    return module;
  }
}
