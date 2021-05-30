import { IinputControl } from './input.interface';

export class InputControl implements IinputControl {
    value: any;
    disabled: boolean;
    name: string ='';
    type: string;
    errors: any[];
    rules: any[];

    setValue = (value: any) => {
        this.value = value;
    }

    public getValue = () => {
        return this.value;
    }
    setName = (name: string) => {
        this.name = name;
    }
   public getName = () => {
        return this.name;
    }
    setType = (type: string) => {
        this.type = type;
    }
    getType = () => {
        return this.type;
    }

    setErrors = (errors: any[]) => {
        this.errors = errors
    };

    getErrors = () => { return this.errors; };
}