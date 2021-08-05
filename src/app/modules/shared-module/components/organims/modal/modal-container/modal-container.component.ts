import {
  Component,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver,
  ComponentFactory,
  Type,
  ComponentRef,
  OnDestroy,
  ElementRef,
} from '@angular/core';
import { Modal } from '../model/modal.model';
import { PositionEnum } from '../enum/position-enum';
import { HtmlElementService } from '@sharedModule/services/html-element-service/html-element.service';

@Component({
  selector: 'app-container',
  templateUrl: './modal-container.component.html',
  styleUrls: ['./modal-container.component.scss'],
})

export class ModalContainerComponent implements OnDestroy {
  @ViewChild('modalContainer', { read: ViewContainerRef })
  private modalContainer: ViewContainerRef;
  @ViewChild('baseconteiner') private baseContainerElement: ElementRef;

  containerStyle = ['modal-backdrop'];
  stylePosition = '';
  bloquedContent: boolean = true;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private htmlElementService :HtmlElementService
  ) {}

  createModal<T extends Modal>(
    component: Type<T>,
    conteinerBloqued: boolean = true,
    positionModal: string = '',//PositionEnum.top_center,
    orderPositionWindow: boolean = true
  ): ComponentRef<T> {
    this.modalContainer.clear();
    this.bloquedContent = conteinerBloqued;

    if (this.bloquedContent) {
      this.createConteinerNobloqued();
    } else {
      this.conteinerNotBloqued();
    }

    const factory: ComponentFactory<T> = this.componentFactoryResolver.resolveComponentFactory(
      component
    );
    return this.modalContainer.createComponent(factory, 0);
  }

  ngOnDestroy() {
    let parentElement: HTMLElement = this.baseContainerElement.nativeElement
      .parentElement;

    this.baseContainerElement.nativeElement.remove(); //remover componente
    parentElement.remove(); // remover nodo padre

    if (this.bloquedContent) {
      this.destroyConteinerBloqued();
    }
    console.log('current',this.htmlElementService.htmlElementCurrent)
    console.log('previus',this.htmlElementService.htmlElementPrevious)
    this.htmlElementService.htmlElementPrevious.focus();
  }

  private createConteinerNobloqued(): void {
    let navBlok: HTMLElement;
    navBlok = document.createElement('div');
    navBlok.className = 'panel-block-modal-service';
    navBlok.style.cssText ='position: absolute; z-index: 1; width: 100%; height: 100%; display: flex;cursor: not-allowed;';
    document.getElementsByTagName('app-nav')[0].appendChild(navBlok);
  }

  private destroyConteinerBloqued() {
    document
      .getElementsByClassName('panel-block-modal-service')[0]
      .parentElement.removeChild(
        document.getElementsByClassName('panel-block-modal-service')[0]
      );
  }

  public conteinerNotBloqued(): void {
    this.containerStyle =['modal-backdrop-no-bloqued'];
  }
}
