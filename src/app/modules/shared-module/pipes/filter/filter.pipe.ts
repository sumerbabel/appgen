import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(value: Array<SelectObjet>, arg: string): any {
    if(!arg) {return value;}
    if (arg === '') return value;
    const resultItems = [];
    for (const item of value) {
      if (item.name.toString().toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultItems.push(item);
      };
    };
    return resultItems;
  }
}
export interface SelectObjet{
id:string
name:string
}