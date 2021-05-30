import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ui-input-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {
  @Input() value: string ='';
  @Input() label: string;
  @Input() isRequired: boolean= false;
  @Input() errors: string[] =[];
  @Input() disabled:boolean = false;
  @Output() valueChange = new EventEmitter<string>();

  @Output('on-blur') onBlurEvent: EventEmitter<string> = new EventEmitter();
  constructor() { }


  ngOnInit(): void {
    if (this.isRequired){
      this.label = this.label+'*';
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

}
