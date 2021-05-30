import { DataModel } from '@sharedModule/models-core/data-model';
import { formModel } from '@sharedModule/models-core/form-model';

export class GroupCodeNode extends formModel implements DataModel {
  public _id: string;
  private _idCodeGroup: string;
  private _idNode: string;
  private _type: string;
  private _selected: boolean;
  public name:string;
  public field:string;

  constructor(
    id: string,
    idCodeGroup: string,
    idNode: string,
    type: string,
    selected: boolean,
    name:string ='',
    field:string='',
  ) {
    super();
    this._id = id;
    this._idCodeGroup = idCodeGroup;
    this._idNode = idNode;
    this._type = type;
    this._selected = selected;

    this.name =name;
    this.field=field;

    this.setOriginalValues(this, [
      '_id',
      '_idCodeGroup',
      '_idNode',
      '_type',
      '_selected',
    ]);
  }

  set id(id: string) {
    this._id = id;
  }

  get id(): string {
    return this._id;
  }

  set idCodeGroup(idCodeGroup: string) {
    this._idCodeGroup = idCodeGroup;
  }

  get idCodeGroup(): string {
    return this._idCodeGroup;
  }

  set idNode(idNode: string) {
    this._idNode = idNode;
  }

  get idNode(): string {
    return this._idNode;
  }

  set type(type: string) {
    this._type = type;
  }

  get type(): string {
    return this._type;
  }

  set selected(selected: boolean) {
    this._selected = selected;
  }

  get selected(): boolean {
    return this._selected;
  }


  static createGroupCodeNode(object: Object): GroupCodeNode {

   let select= object['selected'];

   if(select===1 || select ==='1'){
    select=true;
   } else {select=false}

    let groupCodeNode: GroupCodeNode = new GroupCodeNode(
      object['id'],
      object['id_code_group'],
      object['id_node'],
      object['type'],
      select,
      object['name'],
      object['field']
    );
    groupCodeNode.updatedAt = object['updated_at'];
    groupCodeNode.isNew = false;
    return groupCodeNode;
  }

  static createGroupCodeNodeEmpty(): GroupCodeNode {
    let groupCodeNode: GroupCodeNode = new GroupCodeNode(
      GroupCodeNode.generateUuid(),
      undefined,
      undefined,
      undefined,
      undefined
    );

    groupCodeNode.isNew = true;
    return groupCodeNode;

  }
}
