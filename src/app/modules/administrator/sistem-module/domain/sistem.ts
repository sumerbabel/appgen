import { DataModel } from '@sharedModule/models-core/data-model';
import { formModel } from '@sharedModule/models-core/form-model';
export class Sistem extends formModel implements DataModel {
  public _id: string;
  public _name: string;
  constructor(id: string, name: string) {
    super();
    this._id = id;
    this._name = name;
    this.setOriginalValues(this, ['_id', '_name']);
  }
  set id(id: string) {
    this._id = id;
  }
  get id(): string {
    return this._id;
  }
  setName(name: string) {
    this._name = name;
  }
  get name(): string {
    return this._name;
  }
  static createSistem(object: Object): Sistem {
    let sistem: Sistem = new Sistem(object['id'], object['name']);
    sistem.updatedAt = object['updated_at'];
    sistem.isNew = false;
    return sistem;
  }
  static createSistemEmpty(): Sistem {
    let sistem: Sistem = new Sistem(
      Sistem.generateUuid(),
      undefined
    );
    sistem.isNew = true;
    return sistem;
  }
}
