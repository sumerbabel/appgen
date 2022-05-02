import { Component,ElementRef,HostListener,OnInit, ViewChild} from '@angular/core';
import { AlertService } from '@sharedModule/components/organims/alertForm/service/alert.service';
import { ColumnModel } from '@sharedModule/components/molecules/tables/model/column-model';
import { ModelAction } from '@sharedModule/components/molecules/tables/model/action';
import { ActionGeneric } from '@sharedModule/enums/action-generic.enum';
import { ModalService } from '@sharedModule/components/organims/modal/service/modal.service';
import { DialogService } from '@sharedModule/components/organims/dialogForm/service/dialog.service';
import { ActionButton } from '@sharedModule/enums-object/action-button';
import { EventAction } from '@sharedModule/models-core/action-model';
import { TableModel } from '@sharedModule/models-core/table-model';
import { CreateSistemComponent } from '../create-sistem/create-sistem.component';
import { UpdateSistemComponent } from '../update-sistem/update-sistem.component';
import { Sistem } from '../../domain/sistem';
import { FilterComponent } from './filter/filter.component';
import { AccountService } from 'src/app/modules/core/security/service/account.service';
import { SistemUseCases } from '../../use-case/sistem-use-case';

@Component({
  selector: 'app-page-sistem',
  templateUrl: './page-sistem.component.html',
  styleUrls: ['./page-sistem.component.scss'],
})
export class PageSistemComponent implements OnInit {
  TITLE_HEADER_FORM = 'Lista de Sistems';
  ACTION_BUTTON_CREATE = ActionButton.CREATE;
  SHOW_CLOSE_BUTTON_FORM = false;
  sistems: Sistem[] = [];

  columnsTable: ColumnModel[] = [
    { key: 'name', title: 'Name' },
    { key: 'updated_at', title: 'Fecha Act.' },
    { key: 'action', title: 'Acción', actionColum: true },
  ];

  actionsTable: ModelAction[] = [
    ActionButton.MINI_EDIT,
    ActionButton.MINI_DELETE,
  ];

  //camvas
  @ViewChild('canvasRef', { static: true }) canvasRef: ElementRef<HTMLCanvasElement>;

  private ctx: CanvasRenderingContext2D;

private canvas: HTMLElement = document.getElementById("canvas");
//private ctx 
private canvasOffset 
private offsetX 
private offsetY
private isDown = false;
private startX;
private startY;

 private circle = {
    x: 100,
    y: 290,
    r: 10
};
private  rect = {
    x: 100,
    y: 100,
    w: 40,
    h: 100
};


 draw() {
    this.ctx.clearRect(0, 0, this.canvasOffset.width, this.canvasOffset.height);
    this.ctx.beginPath();
    this.ctx.arc(this.circle.x, this.circle.y, this.circle.r, 0, Math.PI * 2);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.strokeStyle = "black";
    this.ctx.stroke();
    this.ctx.strokeRect(this.rect.x, this.rect.y, this.rect.w, this.rect.h);
}

// return true if the rectangle and circle are colliding
 RectCircleColliding(circle, rect) {
    var distX = Math.abs(circle.x - rect.x - rect.w / 2);
    var distY = Math.abs(circle.y - rect.y - rect.h / 2);

    if (distX > (rect.w / 2 + circle.r)) {
        return false;
    }
    if (distY > (rect.h / 2 + circle.r)) {
        return false;
    }

    if (distX <= (rect.w / 2)) {
        return true;
    }
    if (distY <= (rect.h / 2)) {
        return true;
    }

    var dx = distX - rect.w / 2;
    var dy = distY - rect.h / 2;
    return (dx * dx + dy * dy <= (circle.r * circle.r));
}

@HostListener('document:mousemove', ['$event'])
onMouseMove = (e: any) => {
  if (e.target.id === 'canvas') {
   this.handleMouseMove(e)
  }
}

@HostListener('document:mousedown', ['$event'])
onMouseDown = (e: any) => {
  if (e.target.id === 'canvas') {
   this.handleMouseDown(e)
  }
}

@HostListener('document:mouseup', ['$event'])
onMouseUp = (e: any) => {
  if (e.target.id === 'canvas') {
   this.handleMouseUp(e)
  }
}

@HostListener('document:mouseout', ['$event'])
onMouseOut = (e: any) => {
  if (e.target.id === 'canvas') {
   this.handleMouseOut(e)
  }
}

@HostListener('click', ['$event'])
onClick = (e: any) => {
  if (e.target.id === 'canvasId') {
    this.isAvailabe = !this.isAvailabe;
  }
}


 handleMouseDown(e:any) {

    e.preventDefault();
    //debugger;
    this.startX = parseInt(e.clientX - this.offsetX+'');
    this.startY = parseInt(e.clientY - this.offsetY+'');
  console.log('e.clientX',e.clientX,'e.clientY',e.clientY)
    // Put your mousedown stuff here
    let dx = this.startX - this.circle.x;
    let dy = this.startY - this.circle.y;
    console.log(this.startX,this.startY, dx,dy)
    this.isDown = (dx * dx + dy * dy < this.circle.r * this.circle.r);
    console.log(this.startX,this.startY, dx,dy)
    console.log('dx * dx + dy * dy ',dx * dx + dy * dy )
    console.log('isDown',this.isDown)
    console.log('this.circle.r * this.circle.r',this.circle.r * this.circle.r)
}

 handleMouseUp(e) {
    e.preventDefault();
    this.isDown = false;
}

 handleMouseOut(e) {
    e.preventDefault();
    this.isDown = false;
}

 handleMouseMove(e:any) {
    e.preventDefault();

    // Put your mousemove stuff here
    if (!this.isDown) {
        return;
    }
    let mouseX = parseInt(e.clientX - this.offsetX+'');
    let mouseY = parseInt(e.clientY - this.offsetY+'');
    var dx = mouseX - this.startX;
    var dy = mouseY - this.startY;
    this.startX = mouseX;
    this.startY = mouseY;
    this.circle.x += dx;
    this.circle.y += dy;

    if (this.RectCircleColliding(this.circle, this.rect)) {
        this.ctx.fillStyle = "red";
    } else {
        this.ctx.fillStyle = "skyblue";
    }

    this.draw();
}
  //camvas 2




  //----------



 


  public width: number = 500;
  public height: number = 450;

 // private cx: CanvasRenderingContext2D;

  private points: Array<any> = [];

  public isAvailabe: boolean = false;






  // fin camvas

  tableModelSistem: TableModel = new TableModel(
    this.columnsTable,
    this.actionsTable
  );


  constructor(
    private alertService: AlertService,
    private dialogService: DialogService,
    private modalService: ModalService,
    private accountService: AccountService,
    private _sistemUseCases:SistemUseCases
  ) {
  }

 
  ngOnInit(): void {
    this.ctx = this.canvasRef.nativeElement.getContext('2d');
    this.ctx.fillStyle = "skyblue";
    this.ctx.strokeStyle = "black";
    this.canvasOffset = (this.canvasRef.nativeElement as HTMLCanvasElement)
    //debugger;
    this.offsetX = this.canvasOffset.clientLeft;
    this.offsetY = this.canvasOffset.clientTop;
    this.isDown = false;
    this.startX;
    this.startY;

    this.getSitems();
    const menusession = this.accountService.getMenuSession()
    console.log('4. INICIA PAGE SISTEM MNEU',menusession )
  }

  getSitems() {
    this._sistemUseCases
      .getByFilter(this.tableModelSistem.getParametersQueryString())
      .subscribe((resultGet) => {
        this.tableModelSistem.setDataTableAndPaginationToResponse(resultGet);
      });
  }

  createSistemOpenModal(): void {
    const modalRef = this.modalService.open(CreateSistemComponent);
    modalRef.onResult().subscribe(() => {
      this.getSitems();
    });
  }

  updateSistemOpenModal(sistem: Sistem): void {
    const modalRef = this.modalService.open(UpdateSistemComponent, sistem);
    modalRef.onResult().subscribe(() => {
      this.tableModelSistem.pagination.setInitialPage();
      this.getSitems();
    });
  }

  deleteServiceExecute(sistem: Sistem) {
    this._sistemUseCases.deleteById(sistem.id).subscribe(
      (resultDelete) => {
        this.tableModelSistem.pagination.setInitialPage();
        this.getSitems();
        this.alertService.openAlertSucsses(resultDelete);
      },
      (errorArray) => {
        this.alertService.openAlertWarning(errorArray);
      }
    );
  }

  DeleteSistemOpenModal(sistem: Sistem): void {
    this.dialogService
      .openDialog({
        title: 'Eliminar Registro',
        textDialog: `¿Está seguro de ELIMINAR el registro :  ${sistem.name}?`,
      })
      .subscribe((resulModal) => {
        if (resulModal === ActionGeneric.YES) {
          this.deleteServiceExecute(sistem);
        }
      });
  }

  tableSistemActions($event: EventAction<any>) {
    switch ($event.action) {
      case ActionGeneric.EDIT:
        this.updateSistemOpenModal($event.dataModel);
        break;
      case ActionGeneric.DELETE:
        this.DeleteSistemOpenModal($event.dataModel);
        break;
      case ActionGeneric.PAGINATE:
        this.getSitems();
        break;
    }
  }

  filterOpenModal(): void {
    const modalRef = this.modalService.open(
      FilterComponent,
      this.tableModelSistem.searchFilter
    );
    modalRef.onResult().subscribe(() => {
      this.getSitems();
    });
  }

  filterClear() {
    this.getSitems();
  }


// canvas methods
ngAfterViewInit(): void {
  this.draw()
}

ACTION_FORM: ModelAction[] = [ActionButton.SAVE, ActionButton.CANCEL];
}


