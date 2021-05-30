import { ModelData } from '@sharedModule/models-core/ModelData';
import { Column } from './column';
import { ModelAction } from './action';
export class DataTable {
    moldelArray: ModelData[] = [];
    columns: Column[] = [];
    actions: ModelAction[] = [];
  
    constructor(modelarray: ModelData[]= [], columns:Column[]= [] , actions:ModelAction[]= []) {
      this.moldelArray = modelarray
      this.actions=actions;
      this.columns=columns;
    }

    get actionArray(){
       return this.actions;
    }
  
    addAction(action:ModelAction){
      if(action){
        this.actions.push(action)
        this.actions =[...this.actions]
      }
    }

    deleteAction(action:string){
      if(action){
        const index = this.actions.findIndex(actionItem => actionItem.action=== action)
        this.actions.splice(index, 1);
        this.actions =[...this.actions]
      }
    }

    get columnArray(){
      return this.columns;
   }

    addColum(colum:Column){
      if(colum){
        this.columns.push(colum)
        this.columns =[...this.columns]
      }
    }

    deleteColumn(keyColum:string){
      if(keyColum){
        const index = this.columns.findIndex(columItem => columItem.key=== keyColum)
        this.columns.splice(index, 1);
        this.columns =[...this.columns]
      }
    }

    addModel(model: ModelData) {
      if(model){
      this.moldelArray.push(model)
      this.moldelArray = [...this.moldelArray.reverse()];}
    }
  
    deleteModel(idModel: string) {
      if(idModel){
      const index = this.moldelArray.findIndex(modelDataItem => modelDataItem.id === idModel)
      this.moldelArray.splice(index, 1);
      this.moldelArray = [...this.moldelArray];}
    }
  
    updateModel(model: ModelData) {
      if(model){
      const index = this.moldelArray.findIndex(modelDataItem => modelDataItem.id === model.id)
      this.moldelArray[index] = model;
      this.moldelArray = [...this.moldelArray];}
    }
  
    get dataArray() {
      return this.moldelArray
    }
  
  }