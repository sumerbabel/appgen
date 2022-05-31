import { Component, OnInit, EventEmitter, Output, Input, ViewChild, ElementRef } from '@angular/core';
import { CompileShallowModuleMetadata } from '@angular/compiler';
import { KeyFocus } from '@sharedModule/static-class/key-focus';

@Component({
  selector: 'text-area-model',
  templateUrl: './text-area-model.component.html',
  styleUrls: ['./text-area-model.component.scss']
})
export class TextAreaModelComponent implements OnInit {

  @Input() value: string ='';
  @Input() label: string;
  @Input() type: string;
  @Input() placeholder: string ='';
  @Input() pattern : string ='';
  @Input() isRequired: boolean= false;
  @Input() errors: string[] =[];
  @Input() disabled:boolean = false;
  @Input() autoFocus: boolean= false;
  @Output() valueChange = new EventEmitter<string>();
  @Output('key-press') keyPressEvent: EventEmitter<any> = new EventEmitter();
  @Output('on-blur') onBlurEvent: EventEmitter<string> = new EventEmitter();
  constructor() { }

  numeroSaltosLinea = 0;
  SIZE_BARE_LINE: number = 0.7;
  @ViewChild("inpuAreaModel") InputModel: ElementRef;
ngAfterViewInit() {
  if(this.autoFocus){
    this.InputModel.nativeElement.focus();
  }
}
  ngOnInit(): void {
    if (this.isRequired){
      this.label = this.label+'*';
    }

    if (this.value) {
      this.value = String(this.value);
      this.numeroSaltosLinea = this.value.split(/\r?\n/).length;
      if (this.value.length>150 && this.numeroSaltosLinea<2){
        this.numeroSaltosLinea=3;
      }
    }
  }

  changeControlEvent(event: any){
    this.value =event
    this.valueChange.emit(this.value)
    this.value = String(this.value);
    let lines = this.value.split(/\r?\n/).length;
     this.numeroSaltosLinea= this.SIZE_BARE_LINE*lines
    if (this.value==''||this.value==null){
      this.numeroSaltosLinea=1;
    }
  }

  ngOnChanges(): void {
    if (this.value==''||this.value==null){
      this.numeroSaltosLinea=1;
    }
}

  isinputBlur =false;
  blurInput() {
    this.isinputBlur = true;
    this.onBlurEvent.emit(this.value)
  }

  keyPress($event){
    if ($event.keyCode === 13) {
      this.keyPressEvent.emit($event);
    } else{
      KeyFocus.keyDrownToFocus($event);
    }  
  }

}
