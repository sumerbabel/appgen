import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(value: any, arg: string): any {
    if(!arg) {return value;}
    if (arg === '') return value;
    const resultItems = [];
    for (const item of value) {
      if (item.name.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultItems.push(item);
      };
    };
    return resultItems;
  }
}