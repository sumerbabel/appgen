import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  SimpleChanges,
} from '@angular/core';
import { KeyFocus } from '@sharedModule/static-class/key-focus';
import { ItemPanelComponent } from './item-panel/item-panel.component';

@Component({
  selector: 'ui-input-select-model',
  templateUrl: './select-model.component.html',
  styleUrls: ['./select-model.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class SelectModelComponent implements OnInit {
  @Output() valueChange = new EventEmitter<any>();
  @Output() textSelectChange = new EventEmitter<any>();
  @Output() itemSelect = new EventEmitter<any>();
  @Output('on-blur') onBlurEvent: EventEmitter<any> = new EventEmitter();
  @Input() value: any;
  @Input() textSelect: any;
  @Input() errors: string[] = [];
  @Input() items: any[] = [];
  @Input() label: string;
  @Input() placeholder: string = '';
  @Input() bindValue: string = 'id';
  @Input() bindLabel: string = 'name';
  @Input() disabled: boolean = false;
  @Input() autoFocus: boolean = false;
  @Input() multiple: boolean = false;
  @Input() isRequired: boolean = false;
  @Input() editMode: boolean = false;
  @Output() editModeAction = new EventEmitter<any>();
  @Input() labelDirectionLeft: boolean = false;

  //textSelect: string;
  textName: string;
  initialstyle = false;

  INPUT_TEXT_TOP = 'input-text-top';
  INPUT_TEXT_LEFT = 'input-text-left';
  LABEL_CUSTON_LEFT = 'label-left';
  LABEL_CUSTON_TOP = 'label-top';
  styleClassText: string;
  styleClassLabel: string;

  @ViewChild('inputTextContent')
  inputTextContent: ElementRef;
  witdthPanel = 0;

  constructor(private cdRef: ChangeDetectorRef, private overlay: Overlay) {}

  ngAfterViewChecked() {
    this.witdthPanel = this.inputTextContent.nativeElement.offsetWidth;
    this.cdRef.detectChanges();
  }

  ngOnInit() {
    if (this.labelDirectionLeft) {
      this.styleClassText = this.INPUT_TEXT_LEFT;
      this.styleClassLabel = this.LABEL_CUSTON_LEFT;
    } else {
      this.styleClassText = this.INPUT_TEXT_TOP;
      this.styleClassLabel = this.LABEL_CUSTON_TOP;
    }

    if (this.isRequired) {
      this.label = this.label + '*';
    }

    if (this.items.length > 0) {
      let dataIems = [];
      this.items.forEach((item) => {
        if (!item.hasOwnProperty('id')) {
          dataIems.push({ id: item, name: item });
        }
      });
      if (dataIems.length > 0) {
        this.items = dataIems;
      }
    }

    if (this.value) {
      this.items.forEach((item) => {
        if (String(item['id']) === String(this.value)) {
          this.textName = item['name'];
          this.textSelect = this.textName;
        }
      });
    }
  }

  ngOnChanges( changes: SimpleChanges) {
    const valueEdit =changes['editMode']
    if(valueEdit){
      if(!valueEdit['currentValue']){
        this.onFocus()
      };
    }

    if (this.value) {
      this.items.forEach((item) => {
        if (item['id'] === this.value) {
          this.textName = item['name'];
          this.textSelect = this.textName;
        }
      });
    }else {this.textSelect  = null}
  }

  isinputBlur = false;
  blurInput() {
    this.isinputBlur = true;
    this.onBlurEvent.emit();
  }

  openPanel = false;
  onFocus() {
    this.displayOverlay();
  }

  clickExternal() {
    this.openPanel = false;
    this.textSelect = this.textName;
  }

  clickspan() {
    this.editModeAction.emit(this.editMode)
    if(!this.editMode){
      this.onFocus();
    }

  }

  displayOverlay() {
    const target = this.inputTextContent;
    const overlayRef = this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      panelClass: 'mat-elevation-z8',
      positionStrategy: this.overlay
        .position()
        .flexibleConnectedTo(target)
        .withPositions([
          {
            originX: 'start',
            originY: 'bottom',
            overlayX: 'start',
            overlayY: 'top',
          },
        ]),
    });
    const component = new ComponentPortal(ItemPanelComponent);
    const componentRef = overlayRef.attach(component);
      componentRef.instance.items = this.items;
      componentRef.instance.value =this.value
      componentRef.instance.witdthPanel = this.inputTextContent.nativeElement.offsetWidth;
      componentRef.instance.itemSelect.subscribe((itemselect) => {
      this.textSelect = itemselect.name;
      this.value = itemselect.id;
      this.valueChange.emit(this.value);
      this.itemSelect.emit(itemselect);
      this.textSelectChange.emit(this.textSelect)
      this.inputTextContent.nativeElement.focus();
      overlayRef.dispose();
    });
    overlayRef.backdropClick().subscribe(() => overlayRef.detach());
  }

  clickClear() {
    this.textSelect = null;
    this.value = null;
    this.itemSelect.emit(null);
    this.valueChange.emit(this.value);
    this.textSelectChange.emit(this.textSelect)
  }

  keyPress($event: any){
    if ($event.keyCode === 13) {
      this.clickspan()
  } else{
    KeyFocus.keyDrownToFocus($event);
  }
}
}
