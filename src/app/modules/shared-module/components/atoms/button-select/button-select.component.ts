import { Component, Input, OnInit } from '@angular/core';
import { ModelAction } from '@sharedModule/components/molecules/tables/model/action';
import { ActionButton } from '@sharedModule/enums-object/action-button';

@Component({
  selector: 'ui-button-select',
  templateUrl: './button-select.component.html',
  styleUrls: ['./button-select.component.scss']
})
export class ButtonSelectComponent implements OnInit {

  @Input() actions: ModelAction[];
  constructor() { }

  ngOnInit(): void {
  }
  actionProperties:ModelAction =ActionButton.MINI_OPEN;
  openPanel =false;
  witdthPanel=0;

  onFocus($event){
     this.openPanel=true;
  }

  selectItemPanel(item:any){
    this.clickExternal();
  }

  clickExternal(){
    this.openPanel =false;
  }

}
