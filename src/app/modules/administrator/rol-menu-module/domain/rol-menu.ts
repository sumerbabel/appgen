import { DataModel } from '@sharedModule/models-core/data-model';
import { formModel } from '@sharedModule/models-core/form-model';
export class RolMenu extends formModel implements DataModel {
  public _id: string;
  private _idMenuNode: string;
  private _idRol: string;
  private _action: string;
  constructor(id: string, idMenuNode: string, idRol: string, action: string) {
    super();
    this._id = id;
    this.idMenuNode = idMenuNode;
    this._idRol = idRol;
    this._action = action;
    this.setOriginalValues(this, ['_id', '_idMenuNode', '_idRol', '_action']);
  }
  set id(id: string) {
    this._id = id;
  }
  get id(): string {
    return this._id;
  }
  set idMenuNode(idMenuNode: string) {
    this._idMenuNode = idMenuNode;
  }
  get idMenuNode(): string {
    return this._idMenuNode;
  }
  set idRol(idRol: string) {
    this._idRol = idRol;
  }
  get idRol(): string {
    return this._idRol;
  }
  set action(action: string) {
    this._action = action;
  }
  get action(): string {
    return this._action;
  }

  static createRolMenu(object: Object): RolMenu {
    let rolMenu: RolMenu = new RolMenu(
      object['id'],
      object['id_menu_node'],
      object['id_rol'],
      object['action']
    );

    rolMenu.updatedAt = object['updated_at'];
    rolMenu.isNew = false;
    return rolMenu;

  }

  static createRolMenuEmpty(): RolMenu {
    let rolMenu: RolMenu = new RolMenu(
      RolMenu.generateUuid(),
      undefined,
      undefined,
      undefined
    );

    rolMenu.isNew = true;
    return rolMenu;
  }

}
