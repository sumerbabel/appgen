import { DataModel } from '@sharedModule/models-core/data-model';
    export interface EventAction<T extends DataModel >{
    action:string;
    dataModel:T;
  }
