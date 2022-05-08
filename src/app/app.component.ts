import { Component } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { DialogService } from '@sharedModule/components/organims/dialogForm/service/dialog.service';
import { ModalService } from '@sharedModule/components/organims/modal/service/modal.service';
import { TextTableToArrayComponent } from '@sharedModule/components/organims/text-table-to-array/text-table-to-array.component';
import { MultilineStringService } from '@sharedModule/components/organims/tool-multiline-string/service/multiline-string.service';
import { ActionGeneric } from '@sharedModule/enums/action-generic.enum';
import { MenuTree } from './modules/core/components/menu/domain/menu-tree';
import { User } from './modules/core/security/domain/user';
import { AccountService } from './modules/core/security/service/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  user: User;

  // @HostListener("window:beforeunload", ["$event"]) beforeUnloadHandler(event: Event) {
  //   console.log("window:beforeunload");
  //   event.returnValue = "You will leave this page" as any;
  // }

  // @HostListener("window:unload", ["$event"]) unloadHandler(event: Event) {
  //   console.log("window:unload");
  // }

  ruteActual:string;
  constructor(
    private multilineStringService: MultilineStringService,
    private dialogService: DialogService,
    private modalService: ModalService,
    private router: Router,
    private accountService: AccountService,
    
  ) {
    this.accountService.userSession().subscribe((userData) => {
      this.user = userData;
      if (this.user !== null && this.user !== undefined && this.user.isExpiredToken ===false) {
        this.menu();
      }
    });

    this.router.events.subscribe((val) => {

      if (val instanceof NavigationStart) {
        this.accountService.setMenuSession(this.ruteActual)
      }
      else if (val instanceof NavigationEnd) {
        this.ruteActual =val.url;
        this.accountService.setMenuSession(this.ruteActual)
      }
    });

  }

  logout() {
    this.dialogService
      .openDialog({
        title: 'Cerrar Sesión',
        textDialog: '¿Está seguro de cerrar la sesión?',
      })
      .subscribe((result) => {
        if (result === ActionGeneric.YES) {
          this.isOpenMenu = false;
          this.user=null;
          this.menuTree =[];
          this.accountService.logout();
        }
      });
  }

  openToolMultilineString() {
    this.multilineStringService.openDialog('dataDialog');
  }

  openModalUserProfile() {
    // const modalRef = this.modalService.open(ProfileComponent);
    // modalRef.onResult().subscribe((closed) => {});
  }

  isOpenMenu = false;
  openMenuMovil() {
    this.isOpenMenu = !this.isOpenMenu;
  }

  nodeEventMenu($event) {
    this.isOpenMenu = false;
  }

  menuEvent(event) {
    this.router.navigate([event['rute']]);
    this.isOpenMenu = false;
  }

  ngOnInit() {
    this.isOpenMenu = false;
    this.accountService.setAppOnInit(true);
  }

  menuTree: MenuTree[] = [];
  menu() {
    this.menuTree= this.accountService.getMenuUser()
  }

  openTextToArray(){
    this.modalService.open(TextTableToArrayComponent)
  }

}
