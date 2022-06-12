import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { KeyFocus } from '@sharedModule/static-class/key-focus';
@Component({
  selector: 'app-item-panel',
  templateUrl: './item-panel.component.html',
  styleUrls: ['./item-panel.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ItemPanelComponent implements OnInit {
  @Input() items: string[];
  @Input() witdthPanel:number;
  @Input() value:any;
  @Output() valueChange = new EventEmitter<any>();
  @Output() itemSelect = new EventEmitter<any>();

  @ViewChild('inputSearch')
  inputSearch: ElementRef;
  valueSearch:string;
  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    this.inputSearch.nativeElement.focus()
  }

  selectItemPanel(item:any){
    let obj = {id:item.id, name:item.name};
    this.itemSelect.emit(obj);
  }

  changeControlEvent(event: any){
    this.value =event
    this.valueChange.emit(this.value)
  }

  keyPress($event, item: any){
    if ($event.keyCode === 13 && item !=='' || $event.keyCode === 27) {
      if($event.keyCode === 27){
        this.itemSelect.emit(this.value);
      }else { let obj = {id:item.id, name:item.name};
      this.itemSelect.emit(obj);
    }
  } else{
    KeyFocus.keyDrownToFocus($event);
  }
}
}
