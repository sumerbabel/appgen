import { DataModel } from '@sharedModule/models-core/data-model';
import { formModel } from '@sharedModule/models-core/form-model';
export class Programa extends formModel implements DataModel {
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
    console.log('set name', name)
    this._name = name;
  }

  get name(): string {
    console.log('get name', this)
    return this._name;
  }

  static create(object: Object): Programa {
    let programa: Programa = new Programa(object['id'], object['name']);
    programa.updatedAt = object['updated_at'];
    programa.isNew = false;
    return programa;
  }

  static createEmpty(): Programa {
    let programa: Programa = new Programa(
      Programa.generateUuid(),
      undefined
    );
    programa.isNew = true;
    return programa;
  }

}
