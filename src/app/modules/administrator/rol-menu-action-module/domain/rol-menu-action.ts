import { DataModel } from '@sharedModule/models-core/data-model';
import { formModel } from '@sharedModule/models-core/form-model';
export class RolMenuAction extends formModel implements DataModel {
  public _id: string;
  private _idRolMenu: string;
  private _idMenu: string;
  private _action: string;

  constructor(id: string, idRolMenu: string, idMenu: string, action: string) {
    super();
    this._id = id;
    this._idRolMenu = idRolMenu;
    this._idMenu = idMenu;
    this._action = action;
    this.setOriginalValues(this, ['_id', '_idRolMenu', '_idMenu', '_action']);
  }

  set id(id: string) {
    this._id = id;
  }

  get id(): string {
    return this._id;
  }

  set idRolMenu(idRolMenu: string) {
    this._idRolMenu = idRolMenu;
  }

  get idRolMenu(): string {
    return this._idRolMenu;
  }

  set idMenu(idMenu: string) {
    this._idMenu = idMenu;
  }

  get idMenu(): string {
    return this._idMenu;
  }

  set action(action: string) {
    this._action = action;
  }

  get action(): string {
    return this._action;
  }

  static createRolMenuAction(object: Object): RolMenuAction {
    let rolMenuAction: RolMenuAction = new RolMenuAction(
      object['id'],
      object['id_rol_menu'],
      object['id_menu'],
      object['action']
    );
    rolMenuAction.updatedAt = object['updated_at'];
    rolMenuAction.isNew = false;
    return rolMenuAction;
  }

  static createRolMenuActionEmpty(): RolMenuAction {
    let rolMenuAction: RolMenuAction = new RolMenuAction(
      RolMenuAction.generateUuid(),
      undefined,
      undefined,
      undefined
    );
    rolMenuAction.isNew = true;
    return rolMenuAction;
  }
}
