import { Component, OnInit } from '@angular/core';
import { Alert } from '../domain/alert';
import { Modal } from '../../modal/model/modal.model';
@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent extends Modal implements OnInit {
  dataAlert: Alert;
  contadorAlert:any;
  maxCounter= 78.5;
  colorPanel ='#068419';
  colorBarr ='#2d953d'

  constructor() { super() }

top:string;
  ngOnInit(): void {
    switch (this.dataAlert.type) {
      case 'WARNING':
          this.colorBarr ='#cb341f';
          this.colorPanel ='#cb341f';
        break;

      case 'INFO':
          this.colorBarr ='#1e618b';
          this.colorPanel ='#1e618b';
      break;
      case 'SUCSSES':
      this.colorBarr ='#197247';
      this.colorPanel ='#197247';
      break;
      default:
        this.colorBarr ='#3f4447';
        this.colorPanel ='#3f4447';
        break;
    }
    this.timerAlert(this.maxCounter)
  }

  accionFormulario(event) {
   this.save(event)
  }

  modalInput(inputs): void {
    this.dataAlert = inputs.dataAlert;
  }

  save(data: any): void {
    this.modalClose(data);
  }

  timerAlert(maxCounter =96.5) {
    let counter = 0
    let intervalId = setInterval(() => {
        counter = counter + 0.5;
        this.contadorAlert =counter*1.5;

        if(counter >= maxCounter) {
          clearInterval(intervalId);
            this.save('salio')
        }
    }, 14)
  }

  actionForm(action:any){
    this.save('salio')

  }

}
