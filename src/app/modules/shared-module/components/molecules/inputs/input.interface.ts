export interface IinputControl {
    value:any;
    name:string;
    disabled:boolean;
    type?:string;
    errors?: any[],
    setValue: (value: any) => void;
    setName: (name: string) => void;
    setType?: (type: string) => void;
    setErrors?:(errors: any[]) => void;
    getErrors?:()=>any;
    getValue:()=>any;
    getName:()=>any;
    getType?:()=>any;
    }