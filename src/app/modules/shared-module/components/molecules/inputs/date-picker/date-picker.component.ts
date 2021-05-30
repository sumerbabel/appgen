import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
@Component({
  selector: 'ui-input-date',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent implements OnInit {

  @Input() value: any;
  @Input() height:string
  @Input() label: string;
  @Input() labelDirectionLeft: boolean=false;
  @Input() color: string;
  @Input() type: string;
  @Input() placeholder: string ='';
  @Input() isRequired: boolean= false;
  @Input() disabled:boolean = false;
  @Input() errors: string[] =[];
  @Output() valueChange = new EventEmitter<any>();
  @Output('on-blur') onBlurEvent: EventEmitter<string> = new EventEmitter();
  @Output('key-press') keyPressEvent: EventEmitter<any> = new EventEmitter();

  INPUT_TEXT_TOP ='input-text-top';
  INPUT_TEXT_LEFT ='input-text-left';
  LABEL_CUSTON_LEFT ='label-left';
  LABEL_CUSTON_TOP ='label-top';
  styleClassText:string;
  styleClassLabel:string;
  valueDate

  constructor() { }

  ngOnInit(): void {
    if(this.labelDirectionLeft){
      this.styleClassText=this.INPUT_TEXT_LEFT;
      this.styleClassLabel=this.LABEL_CUSTON_LEFT;
    } else {
      this.styleClassText=this.INPUT_TEXT_TOP;
      this.styleClassLabel=this.LABEL_CUSTON_TOP;
    }

      if (this.isRequired && this.label){
        this.label = this.label+'*';
      }
        this.valueDate =moment(this.value, ["DD-MM-YYYY", "DD/MM/YYYY"]);
    }

    ngOnChanges() {
        this.valueDate =moment(this.value, ["DD-MM-YYYY", "DD/MM/YYYY"]);
    }

    changeControlEvent(){
       this.value =this.valueDate.format('DD-MM-YYYY');
      this.valueChange.emit(this.value)
    }

    keyPress($event){
      this.keyPressEvent.emit($event);
    }
}
