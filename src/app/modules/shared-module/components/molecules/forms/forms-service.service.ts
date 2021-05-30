import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FormsServiceService {
  private uuidSubject$ : BehaviorSubject<string>;
  private uuid_previus:string

  constructor() { this.uuidSubject$ = new BehaviorSubject('') }
  set(uuiForm:string) {
    this.uuid_previus =this.uuidSubject$.value
    this.uuidSubject$.next(uuiForm);
  }

  get(): Observable<string> {
    return this.uuidSubject$.asObservable();
  }

  setPrevius() {
    this.uuidSubject$.next(this.uuid_previus);
  }
}
