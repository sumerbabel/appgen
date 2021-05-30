import { IinputControl } from './input.interface';

export class Form {
    inputs: IinputControl []
    constructor(inputs: IinputControl[]) {
        this.inputs = inputs;
    }

    pushInput(input: IinputControl) {
        this.inputs.push(input)
    }

    clealAllValues(){
        this.inputs.forEach((input) => {
            input.setValue('');
        })
    }
}