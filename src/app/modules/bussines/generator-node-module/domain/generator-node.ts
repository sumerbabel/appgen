import { DataModel } from '@sharedModule/models-core/data-model';
import { formModel } from '@sharedModule/models-core/form-model';
import { TableItemMasterEnum } from 'src/app/modules/administrator/table-module/enum/table-items-master.enum';
import { ObjetGen } from '../../objet-gen-module/domain/objet-gen';

export class GeneratorNode extends formModel implements DataModel {

  public _id: string;
  private _idParent: string;
  private _idObject: string;
  public _isOpen: boolean;
  private _type:string;
  private _level:number =0;
  private _objetGen: ObjetGen;
  private _children: GeneratorNode[] = [];

  constructor(id: string, idParent: string, idObject: string, isOpen: boolean, objetGen: ObjetGen,type:string='',level:number,  children: GeneratorNode[] = []) {

    super();
    this._id = id;
    this._idParent = idParent;
    this._idObject = idObject;
    this._isOpen = isOpen;
    this._type = type;
    this._level = level
    this._objetGen =objetGen;
    this._children=children;

    this.setOriginalValues(this, ['_id', '_idParent', '_idObject', '_isOpen','_type','_level']);
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

  set idObject(idObject: string) {
    this._idObject = idObject;
  }

  get idObject(): string {
    return this._idObject;
  }

  set isOpen(isOpen: boolean) {
    this._isOpen = isOpen;
  }

  get type(): string {
    return this._type;
  }

  set type(type: string) {
    this._type = type;
  }

  get level(): number {
    return this._level;
  }

  set level(level: number) {
    this._level = level;
  }

  get isOpen(): boolean {
    return this._isOpen;
  }


  set objetGen(objetGen: ObjetGen) {
    this._objetGen = objetGen;
  }

  get objetGen(): ObjetGen {
    return this._objetGen;
  }

  set children(children: GeneratorNode[]) {
    this._children = children;
  }

  get children():GeneratorNode[] {
    return this._children;
  }

  set childrenPush(generatorNodes: GeneratorNode) {
    if(generatorNodes.isNew){
      generatorNodes.objetGen.level =+(this._objetGen.level)+1;
      generatorNodes.level =+(this.level)+1;
      generatorNodes.objetGen.order = +this.children.length + 1;
    }

    this._children.push(generatorNodes);
  }

  getIsNodeInitial() {
    if (this.idParent === undefined ||this.idParent === null || this.idParent === '') {
      return true;
    }
    return false;
  }

  static createGeneratorNode(object: Object): GeneratorNode {

    let isopen: boolean;
    if (object['is_open'] === '1' || object['is_open'] === 1) {
      isopen = true;
    } else {
      isopen = false;
    }

    let objetGen: ObjetGen =  ObjetGen.createObjetGen(object['objetGen']);

    let generatorNodes: GeneratorNode = new GeneratorNode(
      object['id'],
      object['id_parent'],
      object['id_object'],
      isopen,
      objetGen,
      object['type'],
      object['level']
    );

    generatorNodes.updatedAt = object['updated_at'];
    generatorNodes.isNew = false;
    return generatorNodes;
  }

  static createGeneratorNodeEmpty(): GeneratorNode {

    let objetGen: ObjetGen =  ObjetGen.createObjetGenEmpty();
    let generatorNodes: GeneratorNode = new GeneratorNode(
      GeneratorNode.generateUuid(),
      undefined,
      objetGen.id,
      true,
      objetGen,
      undefined,
      0,
      undefined
    );
    generatorNodes.isNew = true;
    return generatorNodes;
  }

  public addChildren(): void {
    let generatorNodes: GeneratorNode = GeneratorNode.createGeneratorNodeEmpty();
    generatorNodes.idParent = this.id;
    generatorNodes.objetGen.level = +this.objetGen.level + 1;
    generatorNodes.level =+this.level + 1;
    generatorNodes.objetGen.order = this.children.length + 1;

    if(generatorNodes.level ===1){
      generatorNodes.objetGen.type = TableItemMasterEnum.TIPO_DE_DATO.table;
    }

    if(generatorNodes.level >1){
      generatorNodes.objetGen.type = TableItemMasterEnum.TIPO_DE_DATO.string
    }


    this.childrenPush = generatorNodes;
    this.isOpen = true;
  }

  public deleteChildren(generatorNodes: GeneratorNode) {
    this.children.forEach((itemGeneratorNode) => {
      if (itemGeneratorNode.id === generatorNodes.id) {
        let index = this.children.indexOf(itemGeneratorNode);
        if (index > -1) {
          this.children.splice(index, 1);
        }
      }
    });
  }

  static createGeneratorNodeRecursive(object: Object): GeneratorNode {
    let generatorNodeInitial: GeneratorNode = this.createGeneratorNode(object);
    if ('children' in object) {
      if (Array.isArray(object['children'])) {
        let arrayChildren: [] = [];
        arrayChildren = object['children'];
        arrayChildren.forEach((generatorNodeChild) => {
          generatorNodeInitial.childrenPush = this.createGeneratorNodeRecursive(
            generatorNodeChild
          );
        });
      }
    }
    return generatorNodeInitial;
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
    return { generatorNodes: arrayDataPersist };
  }

  private dataPersistAll(generatorNodes: GeneratorNode[], arrayDataPersist: Array<any>) {
    generatorNodes.forEach((item, index) => {
      let objectpersist: any = {};
      if (item.getIsModifiedProperties() === true) {
        objectpersist = item.toDataPersistJson();
        if (item.objetGen.getIsModifiedProperties() === false) {
          objectpersist['objetGen'] = item.objetGen.toDataPersistJson();
        }
      }

      if (item.objetGen.getIsModifiedProperties() === true) {
        if (item.getIsModifiedProperties() === false) {
          objectpersist = item.toDataPersistJson();
        }

        objectpersist['objetGen'] = item.objetGen.toDataPersistJson();
      }

      if (Object.keys(objectpersist).length > 0) {
        arrayDataPersist.push({ generatorNode: objectpersist });
      }

      if (item.children.length > 0) {
         if(index ===0 && item.type === TableItemMasterEnum.TIPOS_NODO_GENERADOR_CODIGO.modelo){
           item.objetGen.name =item.children[0].objetGen.name;
           item.objetGen.content =item.children[0].objetGen.content;
           item.objetGen.field =item.children[0].objetGen.field;
         }
        this.dataPersistAll(item.children, arrayDataPersist);
      }
    });
  }

  public setIsOpenAllNode(isOpen: boolean) {
    this.isOpen = isOpen;
    this.setIsOpenRecursiveAll(this.children, isOpen);
  }

  private setIsOpenRecursiveAll(generatorNode: GeneratorNode[], isOpen: boolean): void {
    generatorNode.forEach((item) => {
      item.isOpen = isOpen;
      if (item.children.length > 0) {
        this.setIsOpenRecursiveAll(item.children, isOpen);
      }
    });
  }

 public  validateFileName(): boolean {
    const regularExpression = /^\/?([A-z0-9-_+]+\/)*([A-z0-9]+\.([A-Za-z]{2,4}))$/;
    let filename = this.objetGen.field;
     if(filename.split('.').length>2){
      filename = filename.replace('.','');
     };
    filename = filename.split('-').join('');
    filename = filename.split('@').join('');
    filename = filename.split('[').join('');
    filename = filename.split(']').join('');
    filename = filename.split('(').join('');
    filename = filename.split(')').join('');
    filename = filename.split('/').join('\\');
    let test = regularExpression.test(String(filename).toLowerCase());
    return test;
  }

}
