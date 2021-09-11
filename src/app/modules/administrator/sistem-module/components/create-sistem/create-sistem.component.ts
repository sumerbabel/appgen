import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { AlertService } from '@sharedModule/components/organims/alertForm/service/alert.service';
import { Modal } from '@sharedModule/components/organims/modal/model/modal.model';
import { ModelAction } from '@sharedModule/components/molecules/tables/model/action';
import { ActionGeneric } from '@sharedModule/enums/action-generic.enum';
import { DialogService } from '@sharedModule/components/organims/dialogForm/service/dialog.service';
import { ActionButton } from '@sharedModule/enums-object/action-button';
import { Sistem } from '../../domain/sistem';
import * as JSZip from 'jszip';
import { LoaderService } from '@sharedModule/components/organims/loader/loader.service';
import { SistemUseCases } from '../../use-case/sistem-use-case';
@Component({
  selector: 'app-create-sistem',
  templateUrl: './create-sistem.component.html',
  styleUrls: ['./create-sistem.component.scss'],
})
export class CreateSistemComponent extends Modal implements OnInit {
  TITLE_HEADER_FORM = 'Nuevo Registro sistems';
  TEXT_FOOTER = '* Campos Obligatorios';
  ACTION_FORM: ModelAction[] = [ActionButton.SAVE, ActionButton.CANCEL];

//--canvas
@ViewChild('canvasRef', { static: true }) canvas: ElementRef<HTMLCanvasElement>;
private ctx: CanvasRenderingContext2D;

private BB
private offsetX:number
private offsetY: number;
private WIDTH :number;
private HEIGHT:number;

private dragok = false;
private startX;
private startY;
private startprivate
public  rects = [];
//--canvas fin variables

  constructor(
    private _sistemUseCases:SistemUseCases,
    private alertService: AlertService,
    private dialogService: DialogService,
    private loaderService:LoaderService
  ) {
    super();  
  }

  sistem: Sistem;
  modalInput(): void {}
  ngOnInit(): void {


this.ctx = this.canvas.nativeElement.getContext("2d");
this.BB = this.canvas.nativeElement.getBoundingClientRect();
console.log(this.BB)
console.log( this.canvas)
this.offsetX = this.BB.left;
this.offsetY = this.BB.top+59;
console.log('offsetX_INI',this.offsetX);
console.log('offsetY_INI',this.offsetY);
this.WIDTH = this.canvas.nativeElement.width;
this.HEIGHT = this.canvas.nativeElement.height;
console.log('WIDTH',this.WIDTH);
console.log('HEIGHT',this.HEIGHT);

this.rects.push({
  x: 75 - 15,
  y: 50 - 15,
  width: 30,
  height: 30,
  fill: "#444444",
  isDragging: false
});

this.rects.push({
  x: 75 - 25,
  y: 50 - 25,
  width: 30,
  height: 30,
  fill: "#ff550d",
  isDragging: false
});

this.rects.push({
  x: 75 - 35,
  y: 50 - 35,
  width: 30,
  height: 30,
  fill: "#800080",
  isDragging: false
});

this.rects.push({
  x: 75 - 45,
  y: 50 - 45,
  width: 30,
  height: 30,
  fill: "#0c64e8",
  isDragging: false
});

this.canvas.nativeElement.addEventListener("mousedown", e => this.myDown(e));
this.canvas.nativeElement.addEventListener("mousemove", e => this.myMove(e));
this.canvas.nativeElement.addEventListener("mouseup", e => this.myUp(e));

this.draw()

    this.sistem = Sistem.createSistemEmpty();
  }

   clear() {
    this.ctx.clearRect(0, 0, this.WIDTH, this.HEIGHT);
}

// redraw the scene
 rect(x, y, w, h) {
  this.ctx.beginPath();
  this.ctx.rect(x, y, w, h);
  this.ctx.closePath();
  this.ctx.fill();
}

 draw() {
    this.clear();
    this.ctx.fillStyle = "#FAF7F8";
    this.rect(0, 0, this.WIDTH, this.HEIGHT);

    for (var i = 0; i < this.rects.length; i++) {
        var r = this.rects[i];
        this.ctx.fillStyle = r.fill;
        this.rect(r.x, r.y, r.width, r.height);
    }
}


//---------

 myDown(e:any) {
  e.preventDefault();
  e.stopPropagation();
// console.log('e.clientX ',e.clientX );
// console.log('e.clientY ',e.clientY );
  // get the current mouse position
  let mx = parseInt((e.clientX - this.offsetX)+'');
  let my = parseInt((e.clientY - this.offsetY)+'');

  // test each rect to see if mouse is inside
  this.dragok = false;
  for (let i = 0; i < this.rects.length; i++) {
      let r = this.rects[i];

    //  console.log('mx',mx);
    //  console.log('r.x',r.x);
    //  console.log('r.width',r.width);
    //  console.log('my',my);
    //  console.log('r.y',r.y);
    //  console.log('r.height',r.height);

      if (mx > r.x && mx < r.x + r.width && my > r.y && my < r.y + r.height) {
          this.dragok = true;
          r.isDragging = true;
      } 
      
  }
  // save the current mouse position
  this.startX = mx;
  this.startY = my;
}


// handle mouseup events
 myUp(e:any) {  
  // tell the browser we're handling this mouse event
  e.preventDefault();
  e.stopPropagation();

  // clear all the dragging flags
  this.dragok = false;
  for (let i = 0; i < this.rects.length; i++) {
      this.rects[i].isDragging = false;
  }
}


// handle mouse moves
 myMove(e) {
  // if we're dragging anything...
  if (this.dragok) {

      // tell the browser we're handling this mouse event
      e.preventDefault();
      e.stopPropagation();

      // get the current mouse position
      let mx = parseInt((e.clientX - this.offsetX)+'');
      let my = parseInt((e.clientY - this.offsetY)+'');
      console.log('mx',mx,'my',my)

      // calculate the distance the mouse has moved
      // since the last mousemove
      let dx = mx - this.startX;
      let dy = my - this.startY;

      // move each rect that isDragging 
      // by the distance the mouse has moved
      // since the last mousemove
      for (let i = 0; i < this.rects.length; i++) {
          let r = this.rects[i];
          if (r.isDragging) {
              r.x += dx;
              r.y += dy;
          }
      }

      // redraw the scene with the new rect positions
  
      this.draw();

      // reset the starting mouse position for the next mousemove
      this.startX = mx;
      this.startY = my;

  }
}

//----------


  createSistem() {
    this._sistemUseCases.saveNew(this.sistem.toDataPersistJson()).subscribe(
      (resultPost) => {
        this.alertService.openAlertSucsses(resultPost);
        this.modalClose(this.sistem);
      },
      (errorArray) => {
        this.sistem.errors = [errorArray];
      }
    );
  }

  validateSaveRegister() {
    if (this.sistem.isValid) {
      this.dialogService
        .openDialog({
          title: 'Guardar Registro',
          textDialog: '¿Está seguro de GUARDAR el registro?',
        })
        .subscribe((resultDialog) => {
          if (resultDialog === ActionGeneric.YES) {
            this.createSistem();
          }
        });
    }
  }

  cancelRegister() {
    if (this.sistem.isModified) {
      this.dialogService
        .openDialog({
          title: 'Cancelar Registro',
          textDialog:
            '¿Está seguro de CANCELAR el registro, al realizar esta acción se perderán los datos ingresados o modificados?',
        })
        .subscribe((resultDialog) => {
          if (resultDialog === ActionGeneric.YES) {
            this.modalCancel();
          }
        });
    } else {
      this.modalCancel();
    }
  }

  actionFormEvent($event) {
    switch ($event) {
      case ActionGeneric.SAVE:
        this.validateSaveRegister();
        break;
      case ActionGeneric.CANCEL:
        this.cancelRegister();
        break;
      case ActionGeneric.CLOSE:
        this.cancelRegister();
        break;
    }
  }

  files = [];

  fileImputChange($event) {
    this.loaderService.show();
    if ($event.target.files.length > 0) {
      this.files = $event.target.files;
      const formData = new FormData();
      let zipFile: JSZip = new JSZip();
      for (let index = 0; index < this.files.length; index++) {
        zipFile.folder('zipFiles').file(this.files[index].name,this.files[index]);
      }

      zipFile.generateAsync({type: "blob",
      compression: "STORE"})
      .then((content)=> {


        const url = window.URL.createObjectURL(content);
        const a = document.createElement('a');
        a.href = url;
        a.download ='archivozip.zip';
        a.click();
        window.URL.revokeObjectURL(url);
    }).finally(()=>{
      this.loaderService.hide();
    });

    } else {
      this.loaderService.hide();
    }
  }

}
