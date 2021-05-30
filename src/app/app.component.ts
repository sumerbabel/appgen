import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from '@sharedModule/components/organims/dialogForm/service/dialog.service';
import { ModalService } from '@sharedModule/components/organims/modal/service/modal.service';
import { MultilineStringService } from '@sharedModule/components/organims/tool-multiline-string/service/multiline-string.service';
import { ActionGeneric } from '@sharedModule/enums/action-generic.enum';
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
    private accountService: AccountService,
    private multilineStringService: MultilineStringService,
    private dialogService: DialogService,
    private modalService: ModalService,
    private router: Router,
  ) {
    this.accountService.userSession().subscribe((x) => {
      this.user = x;
    });
    console.log('inicia APP COMPONET',  this.user)
  }

  logout() {
    this.dialogService
      .openDialog({
        title: 'Cerrar Sesión',
        textDialog: '¿Está seguro de cerrar la sesión?',
      })
      .subscribe((result) => {
        if (result === ActionGeneric.YES) {
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

  nodeEventMenu($event){
    this.isOpenMenu =false;
  }

  menuEvent(event){
    this.router.navigate(['home']);
  }

  menuEvent2(event){
    this.router.navigate(['register']);
  }
}
