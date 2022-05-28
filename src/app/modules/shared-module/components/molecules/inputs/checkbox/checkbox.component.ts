import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ui-input-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {
  @Input() value: string|boolean ='';
  @Input() label: string;
  @Input() isRequired: boolean= false;
  @Input() errors: string[] =[];
  @Input() disabled:boolean = false;
  @Output() valueChange = new EventEmitter<string|boolean>();

  @Output('on-blur') onBlurEvent: EventEmitter<string|boolean> = new EventEmitter();
  constructor() { }


  ngOnInit(): void {
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
    let value =event
    if (event=='true' || event=='si' || event=='1'){
      value =true
    } else {
      if (event=='false' || event=='no' || event=='o'){
        value =false}
    }
    this.value =value
    this.valueChange.emit(this.value)
  }

  isinputBlur =false;
  blurInput() {
    this.isinputBlur = true;
    this.onBlurEvent.emit(this.value)
  }

}
