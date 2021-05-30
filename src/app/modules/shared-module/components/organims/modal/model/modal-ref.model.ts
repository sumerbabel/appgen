import { ComponentRef } from  '@angular/core';
import { Modal } from './modal.model';
import { ModalContainerComponent } from '../modal-container/modal-container.component';
import { Subject, Observable } from 'rxjs';

export class ModalRef {

  private result$ = new Subject<any>();

  constructor(
    private modalContainer: ComponentRef<ModalContainerComponent>,
    private modal: ComponentRef<Modal>,
  ) {
    this.modal.instance.modalInstance = this;
  }

  modalClose(output?: any): void {
    this.result$.next(output);
    this.destroy$();
  }

  modalCancel(output?: any): void {
    this.result$.next(output);
    this.destroy$();
  }

  onResult(): Observable<any> {
    return this.result$.asObservable();
  }

  private destroy$(): void {
    this.modal.destroy();
    this.modalContainer.destroy();
    this.result$.complete();
  }

}
