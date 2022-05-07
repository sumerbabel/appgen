import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ModelAction } from '../../tables/model/action';
import { ActionButton } from '@sharedModule/enums-object/action-button';
import { ActionGeneric } from '@sharedModule/enums/action-generic.enum';
import { KeyFocus } from '@sharedModule/static-class/key-focus';
@Component({
  selector: 'ui-form-base',
  templateUrl: './formulario-base.component.html',
  styleUrls: ['./formulario-base.component.scss'],
})
export class FormularioBaseComponent implements OnInit {
  @Input() titleHeader: string;
  @Input() colorHeader: string;
  @Input() backgroundColor: string;
  @Input() textFooter: string;
  @Input() errors: string[] = [];
  @Input() actions: ModelAction[];
  @Input() showCloseButton: boolean = false;
  @Input() showFooterButtons: boolean = false;
  @Output() formAction = new EventEmitter<any>();

  ACTION_SAVE = ActionButton.SAVE;
  ACTION_CANCEL = ActionButton.CANCEL;
  ACTION_CLOSE = ActionGeneric.CLOSE;
  UUID_FORM: string;
  UUID_FORM_SERVICE: string;

  constructor(
  ) {
    localStorage.setItem('utimateActionDate', Date.now().toString());
  }

  ngOnInit(): void { }

  actionClose($event) {
    this.formAction.emit(ActionGeneric.CLOSE);
  }

  actionForm(action: any) {

    this.formAction.emit(action);
  }

  actionErrorPanel() {
    this.errors = [];
  }

}
