import { DataModel } from '@sharedModule/models-core/data-model';
import { formModel } from '@sharedModule/models-core/form-model';
export class MenuData extends formModel implements DataModel {
  public _id: string;
  private _idSistem: string;
  private _idModule: string;
  private _name: string;
  private _type: string;
  private _ruteWeb: string;
  private _ruteController: string;
  private _order: number;
  private _icon: string;
  private _level: number = 1;
  private _actionsRol: string;

  constructor(
    id: string,
    idSistem: string,
    idModule: string,
    name: string,
    type: string,
    ruteWeb: string,
    ruteController: string,
    order: number,
    icon: string,
    level: number,
    actionsRol: string
  ) {
    super();
    this._id = id;
    this._idSistem = idSistem;
    this._idModule = idModule;
    this._name = name;
    this._type = type;
    this._ruteWeb = ruteWeb;
    this._ruteController = ruteController;
    this._order = order;
    this._icon = icon;
    this._level = level;
    this._actionsRol = actionsRol;
    this.setOriginalValues(this, [
      '_id',
      '_idSistem',
      '_idModule',
      '_name',
      '_type',
      '_ruteWeb',
      '_ruteController',
      '_order',
      '_icon',
      '_level',
      '_actionsRol',
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
  set idModule(idModule: string) {
    this._idModule = idModule;
  }
  get idModule(): string {
    return this._idModule;
  }
  set name(name: string) {
    this._name = name;
    if (name === null || name === '') {
      this.errors = ['Nombre es requerido'];
    }
  }
  get name(): string {
    return this._name;
  }
  set type(type: string) {
    this._type = type;
  }
  get type(): string {
    return this._type;
  }
  set ruteWeb(ruteWeb: string) {
    this._ruteWeb = ruteWeb;
  }
  get ruteWeb(): string {
    return this._ruteWeb;
  }

  set ruteController(ruteController: string) {
    this._ruteController = ruteController;
  }

  get ruteController(): string {
    return this._ruteController;
  }

  set order(order: number) {
    this._order = order;
  }
  get order(): number {
    return this._order;
  }
  set icon(icon: string) {
    this._icon = icon;
  }
  get icon(): string {
    return this._icon;
  }
  set level(level: number) {
    this._level = level;
  }

  get level(): number {
    return this._level;
  }

  set actionsRol(actionsRol: string) {
    this._actionsRol = actionsRol;
  }

  get actionsRol(): string {
    return this._actionsRol;
  }

  getActionsRolToArray():Array<any>{

    if(this._actionsRol==null ||this._actionsRol == undefined ||this._actionsRol == ''){
    return []
    }
    return String(this._actionsRol).split(",");
  }
 

  static createMenu(object: Object): MenuData {
    let menu: MenuData = new MenuData(
      object['id'],
      object['id_sistem'],
      object['id_module'],
      object['name'],
      object['type'],
      object['rute_web'],
      object['rute_controller'],
      object['order'],
      object['icon'],
      object['level'],
      object['actions_rol']
    );
    menu.updatedAt = object['updated_at'];
    menu.isNew = false;
    return menu;
  }

  static createMenuEmpty(idSistem: string, idModule): MenuData {
    let menu: MenuData = new MenuData(
      MenuData.generateUuid(),
      idSistem,
      idModule,
      undefined,
      undefined,
      undefined,
      undefined,
      1,
      undefined,
      1,
      undefined
    );
    menu.isNew = true;
    return menu;
  }
}
