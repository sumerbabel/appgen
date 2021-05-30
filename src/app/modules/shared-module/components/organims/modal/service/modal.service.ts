import {
  Injectable,
  ComponentFactoryResolver,
  ComponentFactory,
  ApplicationRef,
  Type,
} from '@angular/core';
import { ModalContainerComponent } from '../modal-container/modal-container.component';
import { Modal } from '../model/modal.model';
import { ModalRef } from '../model/modal-ref.model';
@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modalContainer: HTMLElement;
  private modalContainerFactory: ComponentFactory<ModalContainerComponent>;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef
  ) {
    this.setupModalContainerFactory();
  }

  open<T extends Modal>(
    component: Type<T>,
    inputs?: any,
    conteinerBloqued?: boolean,
    positionModal?: string
  ): ModalRef {
    this.setupModalContainerDiv();

    const modalContainerRef = this.appRef.bootstrap(
      this.modalContainerFactory,
      this.modalContainer
    );

    const modalComponentRef = modalContainerRef.instance.createModal(
      component,
      conteinerBloqued,
      positionModal
    );

    if (!inputs) {
      inputs = null;
    }
    modalComponentRef.instance.modalInput(inputs);

    const modalRef = new ModalRef(modalContainerRef, modalComponentRef);

    return modalRef;
  }

  private setupModalContainerDiv(): void {
    this.modalContainer = document.createElement('div');

    this.modalContainer.className = 'panel-block-modal-service';
    this.modalContainer.style.cssText ='position:relative;';

    document
      .getElementsByClassName('modal-content-app')[0]
      .appendChild(this.modalContainer);
  }

  private setupModalContainerFactory(): void {
    this.modalContainerFactory = this.componentFactoryResolver.resolveComponentFactory(
      ModalContainerComponent
    );
  }
}
