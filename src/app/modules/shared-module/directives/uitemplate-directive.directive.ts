import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[uiTemplate]',
  host: {
  }
})
export class UiTemplateDirective {

  @Input('uiTemplate') name: string;

  constructor(public template: TemplateRef<any>) { }

  getType(): string {
    return this.name;
  }

}
