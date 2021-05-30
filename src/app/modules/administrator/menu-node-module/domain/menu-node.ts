import { TreeGeneric } from '@sharedModule/components/organims/tree-generic/domain/tree.generic';
import { formModel } from '@sharedModule/models-core/form-model';
import { Menu } from './menu';
export class MenuNode extends formModel implements TreeGeneric {
  public  _id: string;
  private _idParent: string;
  private _idSecurrityMenu:string;
  public  _isOpen: boolean;
  private _hasChildren: boolean;
  private _menu: Menu;
  public  _children: MenuNode[] = [];

  constructor(
    id:string,
    idParent:string,
    idSecurrityMenu:string,
    isOpen:boolean,
    hasChildren:boolean,
    menu: Menu,
    children: MenuNode[] = []
  ) {
    super();
    this._id = id;
    this._idParent = idParent;
    this._idSecurrityMenu = idSecurrityMenu;
    this._isOpen = isOpen;
    this._hasChildren = hasChildren;
    this._children = children;
    this._menu = menu;
    this.setOriginalValues(this, [
      '_id',
      '_idParent',
      '_idSecurrityMenu',
      '_isOpen',
      '_hasChildren',
    ]);
  }

  set id(id: string) {
    this._id = id;
  }

  get id(): string {
    return this._id;
  }

  set idParent(idParent: string) {
    this._idParent = idParent;
  }

  get idParent(): string {
    return this._idParent;
  }

  set idSecurrityMenu(idSecurrityMenu: string) {
    this._idSecurrityMenu = idSecurrityMenu;
  }

  get idSecurrityMenu(): string {
    return this._idSecurrityMenu;
  }

  set isOpen(isOpen: boolean) {
    this._isOpen = isOpen;
  }

  get isOpen(): boolean {
    return this._isOpen;
  }

  public setIsOpen(isOpen: boolean) {
    this.isOpen = isOpen;
  }
  public getIsOpen(): boolean {
    return this.isOpen;
  }

  set hasChildren(hasChildren: boolean) {
    this._hasChildren = hasChildren;
  }

  get hasChildren(): boolean {
    return this._hasChildren;
  }

  set childrens(children: MenuNode[]) {
    this._children = children;
  }

  set childrenPush(menuNode: MenuNode) {
    this._children.push(menuNode);
  }

  get childrens(): MenuNode[] {
    return this._children;
  }

  set menu(menu: Menu) {
    this._menu = menu;
  }

  get menu(): Menu {
    return this._menu;
  }

  getIsNodeInitial() {
    if (this.idParent === undefined ||this.idParent === null || this.idParent === '') {
      return true;
    }
    return false;
  }

  public setIsOpenAllNode(isOpen: boolean) {
    this.isOpen = isOpen;
    this.setIsOpenRecursiveAll(this.childrens, isOpen);
  }

  private setIsOpenRecursiveAll(menuNode: MenuNode[], isOpen: boolean): void {
    menuNode.forEach((item) => {
      item.isOpen = isOpen;
      if (item.childrens.length > 0) {
        this.setIsOpenRecursiveAll(item.childrens, isOpen);
      }
    });
  }

  static createMenuNode(object: Object): MenuNode {
    let isopen: boolean;
    if (object['is_open'] === '1' || object['is_open'] === 1) {
      isopen = true;
    } else {
      isopen = false;
    }

    let hasChildren: boolean;
    if (object['has_children'] === '1' || object['has_children'] === 1) {
      hasChildren = true;
    } else {
      hasChildren = false;
    }

    let menu: Menu;
    if (object['menu']) {
      menu = Menu.createMenu(object['menu']);
    }

    let menuNode: MenuNode = new MenuNode(
      object['id'],
      object['id_parent'],
      object['id_securrity_menu'],
      isopen,
      hasChildren,
      menu
    );
    menuNode.updatedAt = object['updated_at'];
    return menuNode;
  }

  static createMenuNodeRecursive(object: Object): MenuNode {
    let manuNodeInitial: MenuNode = this.createMenuNode(object);
    if ('children' in object) {
      if (Array.isArray(object['children'])) {
        let arrayChildren: [] = [];
        arrayChildren = object['children'];
        arrayChildren.forEach((menuNodeChild) => {
          manuNodeInitial.childrenPush = this.createMenuNodeRecursive(
            menuNodeChild
          );
        });
      }
    }
    return manuNodeInitial;
  }

  public deleteChildren(menuNode: MenuNode) {
    this.childrens.forEach((itemMenuNode) => {
      if (itemMenuNode.id === menuNode.id) {
        let index = this.childrens.indexOf(itemMenuNode);
        if (index > -1) {
          this.childrens.splice(index, 1);
        }
      }
    });
  }

  public addChildren(): void {
    let menuNode: MenuNode = MenuNode.createMenuNodeEmpty(
      this.menu.idSistem,
      this.menu.idModule
    );
    menuNode.idParent = this.id;
    this.hasChildren = true;
    menuNode.menu.level = this.menu.level + 1;
    this.menu.level;
    menuNode.menu.order = this.childrens.length + 1;
    this.childrenPush = menuNode;
    this.isOpen = true;
  }

  static createMenuNodeEmpty(idSistem: string, idModule): MenuNode {
    let menu: Menu = Menu.createMenuEmpty(idSistem, idModule);
    let menuNode: MenuNode = new MenuNode(
      MenuNode.generateUuid(),
      undefined,
      menu.id,
      false,
      false,
      menu
    );
    menuNode.isNew = true;
    return menuNode;
  }

  public getIsModified() {
    this.toDataAllPersistJson();
    return this.isModified;
  }

  public toDataAllPersistJson() {
    let arrayDataPersist = [];
    this.dataPersistAll([this], arrayDataPersist);
    if (arrayDataPersist.length > 0) {
      this.isModified = true;
    }
    return { menuNodes: arrayDataPersist };
  }

  private dataPersistAll(menuNode: MenuNode[], arrayDataPersist: Array<any>) {
    menuNode.forEach((item) => {
      let objectpersist: any = {};
      if (item.getIsModifiedProperties() === true) {
        objectpersist = item.toDataPersistJson();
        if (item.menu.getIsModifiedProperties() === false) {
          objectpersist['menu'] = item.menu.toDataPersistJson();
        }
      }

      if (item.menu.getIsModifiedProperties() === true) {
        if (item.getIsModifiedProperties() === false) {
          objectpersist = item.toDataPersistJson();
        }

        objectpersist['menu'] = item.menu.toDataPersistJson();
      }

      if (Object.keys(objectpersist).length > 0) {
        arrayDataPersist.push({ menuNode: objectpersist });
      }

      if (item.childrens.length > 0) {
        this.dataPersistAll(item.childrens, arrayDataPersist);
      }
    });
  }
}
