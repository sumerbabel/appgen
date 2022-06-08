import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { KeyFocus } from '@sharedModule/static-class/key-focus';
@Component({
  selector: 'ui-input-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class CheckboxComponent implements OnInit {
  @Input() value: string|boolean ='';
  @Input() label: string;
  @Input() isRequired: boolean= false;
  @Input() errors: string[] =[];
  @Input() disabled:boolean = false;
  @Output() valueChange = new EventEmitter<string|boolean>();
  @Output('key-press') keyPressEvent: EventEmitter<any> = new EventEmitter();
  @Output('on-blur') onBlurEvent: EventEmitter<string|boolean> = new EventEmitter();
  @Input() labelDirectionLeft: boolean = false;

  INPUT_TEXT_TOP = 'input-text-top';
  INPUT_TEXT_LEFT = 'input-text-left';
  LABEL_CUSTON_LEFT = 'label-left';
  LABEL_CUSTON_TOP = 'label-top';
  styleClassText: string;
  styleClassLabel: string;
  constructor() { }

  ngOnInit(): void {

    if (this.labelDirectionLeft) {
      this.styleClassText = this.INPUT_TEXT_LEFT;
      this.styleClassLabel = this.LABEL_CUSTON_LEFT;
    } else {
      this.styleClassText = this.INPUT_TEXT_TOP;
      this.styleClassLabel = this.LABEL_CUSTON_TOP;
    }


    if (this.isRequired){
      this.label = this.label+'*';
    }

    let value =this.value
    if (value=='true' || value=='si' || value=='1'){
      this.value =true
    } else {
      if (value=='false' || value=='no' || value=='0'){
        this.value =false}
    }
  }

  changeControlEvent(event: any){
    this.value =event
    this.valueChange.emit(this.value)
  }

  isinputBlur =false;
  blurInput() {
    this.isinputBlur = true;
    this.onBlurEvent.emit(this.value)
  }

  keyPress($event){
    if ($event.keyCode === 13) {
      this.value=!this.value
      this.valueChange.emit(this.value)
      this.keyPressEvent.emit($event);
    } else{
      KeyFocus.keyDrownToFocus($event);
    }
  }

}
