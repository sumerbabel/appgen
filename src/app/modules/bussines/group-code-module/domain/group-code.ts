import { DataModel } from '@sharedModule/models-core/data-model';
import { formModel } from '@sharedModule/models-core/form-model';
import { TableItemMasterEnum } from 'src/app/modules/administrator/table-module/enum/table-items-master.enum';
import { GroupCodeNode } from '../../group-code-node-module/domain/group-code-node';
export class GroupCode extends formModel implements DataModel {

  public _id: string;
  private _name: string;
  private _type: string;
  private _ruteFileBase: string;
  private _ruteImportBase: string;
  private _groupCodeNode: GroupCodeNode[] = [];

  constructor(
    id: string,
    name: string,
    type: string,
    ruteFileBase: string,
    ruteImportBase: string,
    groupCodeNode: GroupCodeNode[] = []
  ) {
    super();
    this._id = id;
    this._name = name;
    this._type = type;
    this._ruteFileBase = ruteFileBase;
    this._ruteImportBase = ruteImportBase;
    this._groupCodeNode=groupCodeNode;

    this.setOriginalValues(this, [
      '_id',
      '_name',
      '_type',
      '_ruteFileBase',
      '_ruteImportBase',
      '_groupCodeNode'
    ]);
  }

  pushGroupCodeNodes(idNode:string,name:string, field:string, type:string) {
    let error:boolean = false;
    let result;
    this._groupCodeNode.forEach(itemNodeGroup=>{
      if(itemNodeGroup.idNode === idNode){
        error= true;
      }
    })

    if(error === false){
      let groupCodeNode= new GroupCodeNode(GroupCodeNode.generateUuid(),this.id,idNode,type,true,name,field);
      groupCodeNode.isNew =true;
      this._groupCodeNode.push(groupCodeNode);
      result={error:false, message: 'Nodo: '+name +' fue agregado correctamente'};
    } else {
      result ={error:true, message: 'Nodo: '+name +' ya se encuentra registrado'};
    }

    return result;
  }

  updateSaveGroupCodeNodes() {
    this._groupCodeNode.forEach(item=>{
      item.isNew = false;
    })
  }

  deleteGroupCodeNodes(idNode :string){
    const index = this._groupCodeNode.findIndex(
      (actionItem) => actionItem.id === idNode
    );
    this._groupCodeNode.splice(index, 1);
    this._groupCodeNode = [...this._groupCodeNode];
  }

  get groupCodeNodesField():GroupCodeNode[] {
    let items =[];
    items =this._groupCodeNode.filter(item=>item.type===TableItemMasterEnum.TIPOS_NODO_GENERADOR_CODIGO.modelo);
    if (!items){ items =[]}
    return items;
  }

  get groupCodeNodesCode():GroupCodeNode[] {
    let items =[];
    items =this._groupCodeNode.filter(item=>item.type===TableItemMasterEnum.TIPOS_NODO_GENERADOR_CODIGO.codigo);

    if (!items){ items =[]}
    return items
  }

  set id(id: string) {
    this._id = id;
  }

  get id(): string {
    return this._id;
  }

  set name(name: string) {
    this._name = name;
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
  set ruteFileBase(ruteFileBase: string) {
    this._ruteFileBase = ruteFileBase;
  }

  get ruteFileBase(): string {
    return this._ruteFileBase;
  }

  set ruteImportBase(ruteImportBase: string) {
    this._ruteImportBase = ruteImportBase;
  }

  get ruteImportBase(): string {
    return this._ruteImportBase;
  }

  static createGroupCode(object: Object): GroupCode {

    let groupCodeNodeArray = [];
    let groupCodeNode: GroupCodeNode[]=[];
    groupCodeNodeArray =object['groupCodeNodes']
    groupCodeNodeArray.forEach(itemNode=>{
      groupCodeNode.push(GroupCodeNode.createGroupCodeNode(itemNode))
    })

    let groupCode: GroupCode = new GroupCode(
      object['id'],
      object['name'],
      object['type'],
      object['rute_file_base'],
      object['rute_import_base'],
      groupCodeNode
    );

    groupCode.updatedAt = object['updated_at'];
    groupCode.isNew = false;
    return groupCode;
  }

  static createGroupCodeEmpty(): GroupCode {
    let groupCode: GroupCode = new GroupCode(
      GroupCode.generateUuid(),
      undefined,
      undefined,
      undefined,
      undefined
    );

    groupCode.isNew = true;
    return groupCode;
  }

  toDataPersistJsonAll(){
    let groupCodePersist = this.toDataPersistJson();
    let nodePersist =[]
    this._groupCodeNode.forEach(itemNode=>{
     nodePersist.push(itemNode.toDataPersistJson())
    })

    groupCodePersist['groupCodeNode'] =nodePersist;

   return {groupCode:groupCodePersist}
  }


}
