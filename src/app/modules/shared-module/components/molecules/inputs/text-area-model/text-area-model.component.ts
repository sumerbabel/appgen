import { Component, OnInit, EventEmitter, Output, Input, ViewChild, ElementRef } from '@angular/core';
import { CompileShallowModuleMetadata } from '@angular/compiler';

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
    console.log({lines})
     this.numeroSaltosLinea= this.SIZE_BARE_LINE*lines
    if (this.value==''||this.value==null){
      this.numeroSaltosLinea=1;
    }
  }

  ngOnChanges(): void {
    // let lines = this.value.split(/\r?\n/).length;
    console.log(this.value,'chan')
    if (this.value==''||this.value==null){
      this.numeroSaltosLinea=1;
    }
    //  this.numeroSaltosLinea= this.SIZE_BARE_LINE*lines
}

  isinputBlur =false;
  blurInput() {
    this.isinputBlur = true;
    this.onBlurEvent.emit(this.value)
  }

}
