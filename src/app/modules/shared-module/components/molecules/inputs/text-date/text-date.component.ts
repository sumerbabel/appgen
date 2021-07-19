import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'ui-input-text-date',
  templateUrl: './text-date.component.html',
  styleUrls: ['./text-date.component.scss']
})
export class TextDateComponent implements OnInit {

  @Input() value: any;
  @Input() height: string
  @Input() label: string;
  @Input() labelDirectionLeft: boolean = false;
  @Input() color: string;
  @Input() type: string;
  @Input() placeholder: string = '';
  @Input() pattern: string = '';
  @Input() isRequired: boolean = false;
  @Input() autoFocus: boolean = true;
  @Input() disabled: boolean = false;
  @Input() errors: string[] = [];
  @Output() valueChange = new EventEmitter<any>();
  @Output('on-blur') onBlurEvent: EventEmitter<string> = new EventEmitter();
  @Output('key-press') keyPressEvent: EventEmitter<any> = new EventEmitter();

  date_value:string[] =['','','',''];

  INPUT_TEXT_TOP = 'input-text-top';
  INPUT_TEXT_LEFT = 'input-text-left';
  LABEL_CUSTON_LEFT = 'label-left';
  LABEL_CUSTON_TOP = 'label-top';
  styleClassText: string;
  styleClassLabel: string;


  public mask = {
    guide: true,
    showMask: true,
    mask: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]
  };

  constructor() { }

  @ViewChild("inpuTextModel1") InputModel1: ElementRef;
  @ViewChild("inpuTextModel2") InputModel2: ElementRef;
  @ViewChild("inpuTextModel3") InputModel3: ElementRef;
  ngAfterViewInit() {
    if (this.autoFocus) {
      this.InputModel1.nativeElement.focus();
    }

  }

  ngOnInit(): void {
    if (this.labelDirectionLeft) {
      this.styleClassText = this.INPUT_TEXT_LEFT;
      this.styleClassLabel = this.LABEL_CUSTON_LEFT;
    } else {
      this.styleClassText = this.INPUT_TEXT_TOP;
      this.styleClassLabel = this.LABEL_CUSTON_TOP;
    }

    if (this.isRequired && this.label) {
      this.label = this.label + '*';
    }
  }

  changeControlEvent1(event: string) {
    this.date_value[0] = event
   const data= event.length>1?this.InputModel2.nativeElement.focus():'';
    this.valueChange.emit(this.value)
  }

  changeControlEvent2(event: string) {
    this.date_value[1] = event
    const data= event.length>1?this.InputModel3.nativeElement.focus():'';
    this.valueChange.emit(this.value)
  }

  changeControlEvent3(event: string) {
    this.date_value[2] = event
    this.valueChange.emit(this.value)
  }


  blurInput() {
    if (!this.value) {
      this.value = null;
    }
    this.valueChange.emit(this.value);
    this.onBlurEvent.emit(this.value);
  }

  keyPress($event) {
    this.keyPressEvent.emit($event);
  }
}
