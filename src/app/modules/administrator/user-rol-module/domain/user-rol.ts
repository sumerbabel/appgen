import { DataModel } from '@sharedModule/models-core/data-model';
import { formModel } from '@sharedModule/models-core/form-model';
export class UserRol extends formModel implements DataModel {
  public _id: string;
  private _idUser: string;
  private _idRol: string;
  private _state: string;
  constructor(id: string, idUser: string, idRol: string, state: string) {
    super();
    this._id = id;
    this._idUser = idUser;
    this._idRol = idRol;
    this._state = state;
    this.setOriginalValues(this, ['_id', '_idUser', '_idRol', '_state']);
  }
  set id(id: string) {
    this._id = id;
  }
  get id(): string {
    return this._id;
  }
  set idUser(idUser: string) {
    this._idUser = idUser;
  }
  get idUser(): string {
    return this._idUser;
  }
  set idRol(idRol: string) {
    this._idRol = idRol;
  }
  get idRol(): string {
    return this._idRol;
  }
  set state(state: string) {
    this._state = state;
  }
  get state(): string {
    return this._state;
  }
  static createUserRol(object: Object): UserRol {
    let userRol: UserRol = new UserRol(
      object['id'],
      object['id_user'],
      object['id_rol'],
      object['state']
    );
    userRol.updatedAt = object['updated_at'];
    userRol.isNew = false;
    return userRol;
  }
  static createUserRolEmpty(): UserRol {
    let userRol: UserRol = new UserRol(
      UserRol.generateUuid(),
      undefined,
      undefined,
      undefined
    );
    userRol.isNew = true;
    return userRol;
  }
}
