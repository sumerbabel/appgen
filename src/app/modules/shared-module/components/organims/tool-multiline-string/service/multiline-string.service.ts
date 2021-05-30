import { Injectable } from '@angular/core';
import { ModalService } from '../../modal/service/modal.service';
import { MultilineArrayComponent } from '../multiline-array/multiline-array.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MultilineStringService {

  constructor(private modalService: ModalService) { }
  
  openDialog(data:any): Observable<any> {
    const modalRef = this.modalService.open(MultilineArrayComponent, { data: data },true);
    return modalRef.onResult()
  }
}
