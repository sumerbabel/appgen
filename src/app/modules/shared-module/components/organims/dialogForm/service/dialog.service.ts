import { Injectable } from '@angular/core';
import { ModalService } from '../../modal/service/modal.service';
import { DialogComponent } from '../dialog/dialog.component';
import { DialogInterface } from '../domain/dialog-interface';
import { Observable } from 'rxjs';
import { PositionEnum } from '../../modal/enum/position-enum';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private modalService: ModalService) { }

  openDialog(dataDialog:DialogInterface): Observable<any> {
    const modalRef = this.modalService.open(DialogComponent, { dataDialog: dataDialog },true,PositionEnum.top_center);
    return modalRef.onResult()
  }

}
