import { Component, OnInit } from '@angular/core';
import { Modal } from '@sharedModule/components/organims/modal/model/modal.model';

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

}
