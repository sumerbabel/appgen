import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ModelAction } from '@sharedModule/components/molecules/tables/model/action';
import { StyleButtonEnum } from './style-enum/enum-style-button';

@Component({
  selector: 'ui-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input() name: string;
  @Input() disabled: boolean = false;
  @Input() icon: string;
  @Input() actionProperties: ModelAction;
  @Input() action: string;
  @Input() type: string;
  @Input() color: string;
  @Input() colorText: string;
  @Input() tooltip: string;
  @Input() styleClass: string[] = [StyleButtonEnum.DEFAULT];
  @Output('on-click') onClickEvent: EventEmitter<any> = new EventEmitter();

  constructor() {}
  statusStyle: boolean = true;
  ngOnInit(): void {
    this.updateProperties();
  }

  ngOnChanges() {
    this.updateProperties();
  }

  updateProperties() {
    if (this.actionProperties) {
      this.name = this.actionProperties.name;
      this.action = this.actionProperties.action;
      this.type = this.actionProperties.type;
      this.icon = this.actionProperties.icon;
      this.color = this.actionProperties.color;
      this.colorText = this.actionProperties.colorText;
      this.styleClass = this.actionProperties.styleClass;
      this.tooltip = this.actionProperties.tooltip;
    }

    if (Array.isArray(this.styleClass)) {
      this.styleClass.forEach((item) => {
        if (item === StyleButtonEnum.MINIM) {
          this.statusStyle = false;
        }
      });
    }
  }

  onClic($event) {
    this.onClickEvent.emit(this.action);
  }

  keyPress($event: KeyboardEvent){
    if ($event.keyCode === 13) {
      this.onClickEvent.emit(this.action);
  }
    
  }
}
