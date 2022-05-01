import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ModelAction } from '@sharedModule/components/molecules/tables/model/action';
import { HtmlElementService } from '@sharedModule/services/html-element-service/html-element.service';
import { KeyFocus } from '@sharedModule/static-class/key-focus';
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
  @Input() isActionOpenModal: boolean = false;
  @Input() styleClass: string[] = [StyleButtonEnum.DEFAULT];
  @Input() autoFocus: boolean= false;
  @Output('on-click') onClickEvent: EventEmitter<any> = new EventEmitter();

  constructor(private htmlElementService :HtmlElementService) {}
  statusStyle: boolean = true;
  ngOnInit(): void {
    this.updateProperties();
  }

  @ViewChild("buttonModel") ButtonModel: ElementRef;
  ngAfterViewInit() {if(this.autoFocus){this.ButtonModel.nativeElement.focus();}}

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
    if(this.isActionOpenModal){this.htmlElementService.htmlElementPrevious =$event.target;}
 
    this.onClickEvent.emit(this.action);
  }

  keyPress($event: any){
    if ($event.keyCode === 13) {
      if(this.isActionOpenModal){this.htmlElementService.htmlElementPrevious =$event.target;}
      this.onClickEvent.emit(this.action);
  } else{
    KeyFocus.keyDrownToFocus($event);
  }
 
  }
}
