import { DataModel } from '@sharedModule/models-core/data-model';
import { formModel } from '@sharedModule/models-core/form-model';
export class SecurityRol extends formModel implements DataModel {
  public _id: string;
  private _idSistem: string;
  private _name: string;
  private _desciption: string;
  private _type: string;
  private _state: string;

  constructor(
    id: string,
    idSistem: string,
    name: string,
    desciption: string,
    type: string,
    state: string
  ) {
    super();
    this._id = id;
    this._idSistem = idSistem;
    this._name = name;
    this._desciption = desciption;
    this._type = type;
    this._state = state;
    this.setOriginalValues(this, [
      '_id',
      '_idSistem',
      '_name',
      '_desciption',
      '_type',
      '_state',
    ]);
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

  set desciption(desciption: string) {
    this._desciption = desciption;
  }

  get desciption(): string {
    return this._desciption;
  }

  set type(type: string) {
    this._type = type;
  }

  get type(): string {
    return this._type;
  }

  set state(state: string) {
    this._state = state;
  }

  get state(): string {
    return this._state;
  }

  static createSecurityRol(object: Object): SecurityRol {
    let securityRol: SecurityRol = new SecurityRol(
      object['id'],
      object['id_sistem'],
      object['name'],
      object['desciption'],
      object['type'],
      object['state']
    );
    securityRol.updatedAt = object['updated_at'];
    securityRol.isNew = false;
    return securityRol;
  }

  static createSecurityRolEmpty(): SecurityRol {
    let securityRol: SecurityRol = new SecurityRol(
      SecurityRol.generateUuid(),
      undefined,
      undefined,
      undefined,
      undefined,
      undefined
    );
    securityRol.isNew = true;
    return securityRol;
  }
}
