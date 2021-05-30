import { Injectable } from '@angular/core';
import { ModalService } from '../../modal/service/modal.service';
import { Alert } from '../domain/alert';
import { Observable } from 'rxjs';
import { AlertComponent } from '../alert/alert.component';
import { PositionEnum } from '../../modal/enum/position-enum';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private modalService: ModalService) { }

  openAlert(dataAlert:Alert): Observable<any> {
    const modalRef = this.modalService.open(AlertComponent, { dataAlert: dataAlert },false,PositionEnum.top_center);
    return modalRef.onResult();
  }

  openAlertWarning(errorMessage:string): Observable<any>{
    const dataAlert:Alert ={
      title:'',
      textAlert:errorMessage,
      type:'WARNING'
    }
    return this.openAlert(dataAlert);
  }

  openAlertInfo(errorMessage:string): Observable<any>{
    const dataAlert:Alert ={
      title:'',
      textAlert:errorMessage,
      type:'INFO'
    }
    return this.openAlert(dataAlert);
  }

  openAlertSucsses(errorMessage:string): Observable<any>{
    const dataAlert:Alert ={
      title:'',
      textAlert:errorMessage,
      type:'SUCSSES'
    }
    return this.openAlert(dataAlert);
  }

}
