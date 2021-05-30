export interface TreeGeneric {
   isOpen:boolean;
   id:string|number;
   children?:TreeGeneric[];
}