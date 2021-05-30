import { TreeGeneric } from './tree-generic';
import { ModelData } from '@sharedModule/models-core/ModelData';

export class TreeBase<T extends ModelData> implements TreeGeneric {
    isOpen:boolean;
    id:string|number;
    modelData:T
    children?:TreeBase<T>[];
    private INCREMENT_LEVEL =1;
    private INCREMENT_ORDER =1;

    constructor(isOpen:boolean, id:string|number, modelData:T, childrem? :TreeBase<T>[]){
        this.isOpen=isOpen;
        this.id=id;
        this.modelData =modelData;
        this.children =childrem;
    }

    setChildren(children:TreeBase<T>) {
        if(!this.children){
            this.children =[];
        } 
        let index_children=0 
        if(this.children.length>0){
             index_children=this.children.length-1;
             let maxIndexChildren = this.children[index_children];
             children.modelData.treeObject.order =maxIndexChildren.modelData.treeObject.order+this.INCREMENT_ORDER;
        }

        children.modelData.treeObject.level=this.modelData.treeObject.level+this.INCREMENT_LEVEL;
        this.children = [...this.children,children];
        this.toggleIsOpen();
    }

    deleteNodeChild(node:TreeBase<T>) {
        if(this.children){
            this.children.forEach(nodeParent=>{
                if ( nodeParent.id === node.id){
                 let index = this.children.indexOf(nodeParent)
                 if (index > -1) {
                  this.children.splice(index, 1);
                 }
               } 
              })
        }   
        this.children=[...this.children] 
    }

    static addchildren<T extends ModelData>(children:T[]):TreeBase<T> {
      return this.addRecursiveCreate<T>(children)
    }

    static addRecursiveCreate<T extends ModelData>(ObjetoInicio:T[]=[],objectdelHijo?:TreeBase<T>) {
        let newTreeBase:TreeBase<T>;
        ObjetoInicio.forEach(nodeInicio =>{

           if(typeof(nodeInicio)!=='object'){
            nodeInicio =  JSON.parse(JSON.stringify(nodeInicio));
           }

          let dataModel ={...nodeInicio};
              dataModel['children']=undefined;

            newTreeBase= new TreeBase<T>(false,dataModel['id'],dataModel)
            if (objectdelHijo) {
                objectdelHijo.children.push(newTreeBase) 
            }
            
            if ('children' in nodeInicio) {
                if(!newTreeBase.children){
                    newTreeBase.children=[];
                }
                this.addRecursiveCreate(nodeInicio['children'],newTreeBase)
              }
        }) 

        return newTreeBase
    }

    
    static addchildrenArray<T extends ModelData>(children:T[]):TreeBase<T>[] {

        return this.addRecursiveCreateArray<T>(children,true)
      }
  
      static addRecursiveCreateArray<T extends ModelData>(ObjetoInicio:T[]=[],eselPrimero:boolean,objectdelHijo?:TreeBase<T>):TreeBase<T>[]  {
          let newTreeBase:TreeBase<T>;
          let resultTreeBase:TreeBase<T>[] =[];
          ObjetoInicio.forEach(nodeInicio =>{
    
            let dataModel =nodeInicio;
                dataModel['children']=undefined;
    
              newTreeBase= new TreeBase<T>(false,dataModel['id'],dataModel)
              if (objectdelHijo) {
                  objectdelHijo.children.push(newTreeBase) 
              }
              
              if ('children' in nodeInicio) {
                  if(!newTreeBase.children){
                      newTreeBase.children=[];
                  }
                  this.addRecursiveCreateArray(nodeInicio['children'],false,newTreeBase)
                }
            if (eselPrimero){
                resultTreeBase.push(newTreeBase); 
            }

          }) 
  
          return resultTreeBase
      }
  

    closeNode(){
        this.isOpen = false;
    }

    openNode(){
        this.isOpen = true;
    }

    getIsOpenNode() :boolean{
        return this.isOpen;
    }

    toggleIsOpen(){
        if (!this.getIsOpenNode()){
            this.openNode()
        } 
    }

    openNodeAll() {
        this.openNode();
        if(this.children){
            this.openNodeAllRecursive(this.children);
        }
    }

    openNodeAllRecursive(children: TreeBase<T>[]){
        children.forEach(node =>{         
            node.openNode();
                if(node.children){
                    this.openNodeAllRecursive(node.children);
                }
        }) 
    }

    closeNodeAll() {
        this.closeNode();
        if (this.children){
            this.closeNodeAllRecursive(this.children);
        }
    }

    closeNodeAllRecursive(children: TreeBase<T>[]){
        children.forEach(node =>{
            node.closeNode();
            if (node.children) {
                this.closeNodeAllRecursive(node.children);
              }
        }) 
    }

 }