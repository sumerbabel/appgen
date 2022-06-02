import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { ModelAction } from '@sharedModule/components/molecules/tables/model/action';
import { KeyFocus } from '@sharedModule/static-class/key-focus';


@Component({
  selector: 'ui-btnclose',
  templateUrl: './button-close.component.html',
  styleUrls: ['./button-close.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ButtonCloseComponent implements OnInit {
  @Input() name: string;
  @Input() disabled: boolean = false;
  @Input() icon: string;
  @Input() actionProperties: ModelAction;
  @Input() action: string ='CANCEL';
  @Input() type: string;
  @Input() color: string;
  @Input() colorText: string;
  @Input() tooltip: string;
  @Input() autoFocus: boolean= false;
  @Output('on-click-close') onClickEventClose: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {

  }

  @ViewChild("buttonModel") ButtonModel: ElementRef;
  ngAfterViewInit() {if(this.autoFocus){this.ButtonModel.nativeElement.focus();}}


onClic($event) {
    this.onClickEventClose.emit(this.action);

  }

  keyPress($event: any){
    if ($event.keyCode === 13) {

      this.onClickEventClose.emit(this.action);
  } else{
    KeyFocus.keyDrownToFocus($event);
  }

  }

}
