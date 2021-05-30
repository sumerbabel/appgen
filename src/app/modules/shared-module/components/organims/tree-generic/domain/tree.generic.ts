export interface TreeGeneric{
  _id:string;
  _children:TreeGeneric[];
  _isOpen:boolean;
  setIsOpen(isOpen: boolean);
  getIsOpen(): boolean;
  setIsOpenAllNode(isOpen: boolean)
}
