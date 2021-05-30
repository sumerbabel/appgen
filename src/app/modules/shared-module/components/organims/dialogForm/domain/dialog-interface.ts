export interface DialogInterface {
    title:string;
    textDialog:string;
    type?:string;
    buttons?:any[];
    closeButton?:boolean;
    data?:any;
}
