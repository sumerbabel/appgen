import { Component, OnInit } from '@angular/core';
import { Modal } from '@sharedModule/components/organims/modal/model/modal.model';
import { ActionGeneric } from '@sharedModule/enums/action-generic.enum';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent extends Modal implements OnInit {
  modalInput(inputs: any): void {
    console.log('')
  }

  constructor() {
    super();
  }

  ngOnInit() {
  }

  actionFormEvent($event) {
    switch ($event) {
      case ActionGeneric.ACCEPT:
        this.modalClose({data:'data result'});
        break;
      case ActionGeneric.CANCEL:
        this.modalCancel();
        break;
      case ActionGeneric.CLOSE:
        this.modalCancel();
        break;
    }
  }

}
