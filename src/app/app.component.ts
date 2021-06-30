import { Component } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { DialogService } from '@sharedModule/components/organims/dialogForm/service/dialog.service';
import { ModalService } from '@sharedModule/components/organims/modal/service/modal.service';
import { MultilineStringService } from '@sharedModule/components/organims/tool-multiline-string/service/multiline-string.service';
import { ActionGeneric } from '@sharedModule/enums/action-generic.enum';
import { MenuTree } from './modules/core/components/menu/domain/menu-tree';
import { MenuService } from './modules/core/components/menu/services/menu.service';
import { MenuActions } from './modules/core/security/domain/menu-actions';
import { User } from './modules/core/security/domain/user';
import { AccountService } from './modules/core/security/service/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  user: User;
  constructor(
    private multilineStringService: MultilineStringService,
    private dialogService: DialogService,
    private modalService: ModalService,
    private router: Router,
    private menuService: MenuService,
    private accountService: AccountService
  ) {

    this.accountService.userSession().subscribe((x) => {
      this.user = x;
      this.menu();
    });

    router.events.subscribe((val) => {
      if (val instanceof NavigationStart) {
        console.log('star', val.url)
        this.accountService.setMenuSession(val.url)
      }

      if (val instanceof NavigationEnd) {
        console.log('end', val.url)
        this.accountService.setMenuSession(val.url)
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
    window.addEventListener("beforeunload", function (e) {
      var confirmationMessage = "\o/";
      e.returnValue = confirmationMessage;
      return confirmationMessage;
    });
    this.isOpenMenu = false;
  }

  menuTree: MenuTree[] = [];
  menu() {
    this.menuService.getMenuUser().subscribe((menuResult: any[]) => {
      menuResult.forEach((item) => {
        this.menuTree.push(MenuTree.createMenuNodeRecursive(item));
      });
      let MenuActionsList: Array<MenuActions> = this.menuTree[0].getMenuList();
      this.accountService.setMenuListSession(MenuActionsList)
    });
  }

}
