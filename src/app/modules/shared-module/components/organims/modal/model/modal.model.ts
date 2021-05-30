import { ModalRef } from './modal-ref.model';

export abstract class Modal {

  modalInstance: ModalRef;

  abstract modalInput(inputs: any): void;

  modalClose(output?: any): void {
    this.modalInstance.modalClose(output);
  }

  modalCancel(output?: any): void {
    this.modalInstance.modalCancel(output);
  }

}