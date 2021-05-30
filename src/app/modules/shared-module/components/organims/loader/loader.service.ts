import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private visible$ : BehaviorSubject<boolean>;
  constructor() { this.visible$ = new BehaviorSubject(false) }

  show() {
    this.visible$.next(true);
  }

  hide() {
    this.visible$.next(false);

  }

  isVisible(): Observable<boolean> {
    return this.visible$.asObservable();
  }


}
