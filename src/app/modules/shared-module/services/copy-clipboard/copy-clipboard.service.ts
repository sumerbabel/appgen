import { Injectable } from '@angular/core';
import { AlertService } from '@sharedModule/components/organims/alertForm/service/alert.service';
@Injectable({
  providedIn: 'root'
})
export class CopyClipBoardService {
  constructor( private alertService: AlertService ) { }

  copyTextToClipBoard(value: string){
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = value;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);

    this.alertService.openAlertInfo('Dato Copiado');
  }

}
