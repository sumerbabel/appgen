import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
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
import { SistemService } from '../../services/sistem.service';
import { FilterComponent } from './filter/filter.component';
import { AccountService } from 'src/app/modules/core/security/service/account.service';

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

  tableModelSistem: TableModel = new TableModel(
    this.columnsTable,
    this.actionsTable
  );

  constructor(
    private sistemService: SistemService,
    private alertService: AlertService,
    private dialogService: DialogService,
    private modalService: ModalService,
    private accountService: AccountService,
    private renderer: Renderer2, private elem: ElementRef
  ) {

    console.log('4. INICIA PAGE SISTEM')
  }

  length: 0;
  domEles;

  ngOnInit(): void {

    this.getSitems();
    const menusession = this.accountService.getMenuSession()
    this.unsetAllOptions()
  }


  unsetAllOptions() {
    let elements = this.elem.nativeElement.querySelectorAll('.input-key');
    elements.forEach((element, index) => {
      element.addEventListener('keydown', (e)=>{

        function collectionHas(a, b) { 
          for(var i = 0, len = a.length; i < len; i ++) {
              if(a[i] == b) return true;
          }
          return false;
      }
      
      function findParentBySelector(elm, selector) {
          var all = document.querySelectorAll(selector);
          var cur = elm.parentNode;
          while(cur && !collectionHas(all, cur)) { 
              cur = cur.parentNode;
          }
          return cur; 
      }

    const item = findParentBySelector(e.target, '.key-focus')
    const parent = findParentBySelector(item, '.line-key')
    const indexLevelOne = Array.from(parent.children).indexOf(item)
    const lengthLevelOne = parent.children.length;
    const incrementLevelOne = ((indexLevelOne + 1) <= (lengthLevelOne - 1)) ? (indexLevelOne + 1) : indexLevelOne
    const decrementLevelOne = ((indexLevelOne - 1) >= (0)) ? (indexLevelOne - 1) : 0

    const parentCero = findParentBySelector(e.target, '.conteiner-key')
    const itemCero = findParentBySelector(e.target, '.line-key')
    const indexLevelcero = Array.from(parentCero.children).indexOf(itemCero)
    const lengthLevelCero = parentCero.children.length;

    const incrementLevelCero = ((indexLevelcero + 1) <= (lengthLevelCero - 1)) ? (indexLevelcero + 1) : indexLevelcero
    const decrementLevelCero = ((indexLevelcero - 1) >= (0)) ? (indexLevelcero - 1) : 0
   
        switch (e.code) {
          case 'ArrowRight':
            parent.children[incrementLevelOne].querySelector('.input-key').focus();
            break;
          case 'ArrowLeft':
            parent.children[decrementLevelOne].querySelector('.input-key').focus();
            break;
          case 'ArrowDown':
            parentCero.children[incrementLevelCero].querySelectorAll('.input-key')[indexLevelOne].focus()
            break;
          case 'ArrowUp':
            parentCero.children[decrementLevelCero].querySelectorAll('.input-key')[indexLevelOne].focus()
            break;
          default:
            break;
        }

      });
    });

  }


//   logKey(e) {
 
//     const indexLevelcero = Array.from(e.target.parentElement.parentElement.children).indexOf(e.target.parentElement)
//     const lengthLevelCero = e.target.parentElement.parentElement.children.length;
//     const incrementLevelCero = ((indexLevelcero + 1) <= (lengthLevelCero - 1)) ? (indexLevelcero + 1) : indexLevelcero
//     const decrementLevelCero = ((indexLevelcero - 1) >= (0)) ? (indexLevelcero - 1) : 0
//     const indexLevelOne = Array.from(e.target.parentElement.children).indexOf(e.target)

//     const elemento =e.target.parentElement.parentElement.parentElement.parentElement

//     const lengthLevelOne = elemento.children.length;
//     const incrementLevelOne = ((indexLevelOne + 1) <= (lengthLevelOne - 1)) ? (indexLevelOne + 1) : indexLevelOne
//     const decrementLevelOne = ((indexLevelOne - 1) >= (0)) ? (indexLevelOne - 1) : 0
// console.log('1',e)
// console.log('2',e.target.parentElement)
// console.log('3',e.target.parentElement.parentElement)
// console.log('4',e.target.parentElement.parentElement.parentElement)

// const elementoCOntenedor=e.target.parentElement.parentElement.parentElement.parentElement.parentElement
// console.log('5',e.target.parentElement.parentElement.parentElement.parentElement)


// console.log('parent',parent)
//     switch (e.code) {

//       case 'ArrowRight':
//         console.log('derecha',elemento.children[incrementLevelOne].querySelector('.input-key'))
//         elemento.children[incrementLevelOne].querySelector('.input-key').focus();
        
//         //children[0].children[0].children[0].focus()
//         break;
//       case 'ArrowLeft':
//         e.target.parentElement.parentElement.parentElement.children[decrementLevelOne].focus()
//         break;

//       case 'ArrowDown':
//         e.target.parentElement.parentElement.parentElement.parentElement.children[incrementLevelCero].children[indexLevelOne].focus()
//         break;
//       case 'ArrowUp':
//         e.target.parentElement.parentElement.parentElement.parentElement.children[decrementLevelCero].children[indexLevelOne].focus()
//         break;
//       default:
//         break;
//     }
//   }




  getSitems() {
    this.sistemService
      .getSistemFilter(this.tableModelSistem.getParametersQueryString())
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
    this.sistemService.deleteSistem(sistem.id).subscribe(
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
}
