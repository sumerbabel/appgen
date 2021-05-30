import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'ui-input-text-model',
  templateUrl: './text-model.component.html',
  styleUrls: ['./text-model.component.scss']
})
export class TextModelComponent implements OnInit {

  @Input() value: any;
  @Input() height:string
  @Input() label: string;
  @Input() labelDirectionLeft: boolean=false;
  @Input() color: string;
  @Input() type: string;
  @Input() placeholder: string ='';
  @Input() pattern : string ='';
  @Input() isRequired: boolean= false;
  @Input() autoFocus: boolean= false;
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


  public mask = {
    guide: true,
    showMask: true,
    mask: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]
  };

  constructor() { }

  @ViewChild("inpuTextModel") InputModel: ElementRef;
ngAfterViewInit() {
  if(this.autoFocus){
    this.InputModel.nativeElement.focus();
  }

}

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
  }

  changeControlEvent(event: any){
    this.value =event
    this.valueChange.emit(this.value)
  }

  blurInput() {
    if(!this.value){
       this.value=null;
    }
    this.valueChange.emit(this.value);
    this.onBlurEvent.emit(this.value);
  }

  keyPress($event){
    this.keyPressEvent.emit($event);
  }

}
