import { Component, OnInit } from '@angular/core';
import { Modal } from '@sharedModule/components/organims/modal/model/modal.model';
import { ActionButton } from '@sharedModule/enums-object/action-button';
import { CopyClipBoardService } from '@sharedModule/services/copy-clipboard/copy-clipboard.service';

@Component({
  selector: 'app-view-code',
  templateUrl: './view-code.component.html',
  styleUrls: ['./view-code.component.scss'],
})
export class ViewCodeComponent extends Modal implements OnInit {
  TITLE_HEADER_FORM = 'Código Fuente';
  constructor(private copyClipBoardService: CopyClipBoardService) {
    super();
  }

  ButtonAction = ActionButton.MINI_COPY;

  textCode: string = '';
  textFile: string = '';
  modalInput(inputObject: any): void {
    this.textCode = inputObject.textCode;
    this.textFile = inputObject.fileNameComplit;
  }

  ngOnInit(): void {}

  copyAction() {
    this.copyClipBoardService.copyTextToClipBoard(this.textCode);
  }

  actionFormEvent($event) {
    this.modalClose();
  }
}
