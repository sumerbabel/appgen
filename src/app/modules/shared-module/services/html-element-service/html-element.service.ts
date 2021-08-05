import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HtmlElementService {
  _htmlElementPrevious: HTMLElement
  _htmlElementCurrent: HTMLElement

  set htmlElementPrevious(htmlElementPrevious: HTMLElement) {
    this._htmlElementPrevious = htmlElementPrevious;

  }

  get htmlElementPrevious(): HTMLElement {
    return this._htmlElementPrevious
  }

  set htmlElementCurrent(htmlElementCurrent: HTMLElement) {
    this.htmlElementPrevious =this._htmlElementCurrent
    this._htmlElementCurrent = htmlElementCurrent;

  }
  
  get htmlElementCurrent(): HTMLElement {
    return this._htmlElementCurrent
  }

}
