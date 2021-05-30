import { Component, OnInit } from '@angular/core';
import { AlertService } from '@sharedModule/components/organims/alertForm/service/alert.service';
import { Modal } from '@sharedModule/components/organims/modal/model/modal.model';
import { ActionGeneric } from '@sharedModule/enums/action-generic.enum';
import { ActionButton } from '@sharedModule/enums-object/action-button';
import { MenuNodeAction } from '../../domain/menu-node-action';
import { ModalService } from '@sharedModule/components/organims/modal/service/modal.service';
import { EditRolMenuActionComponent } from '../edit-rol-menu-action/edit-rol-menu-action.component';
import { MenuNodeService } from '../../../menu-node-module/services/menu-node.service';
import { RolMenu } from '../../../rol-menu-module/domain/rol-menu';

@Component({
  selector: 'app-update-menu-node-action',
  templateUrl: './edit-menu-node-action.component.html',
  styleUrls: ['./edit-menu-node-action.component.scss'],
})
export class EditMenuNodeActionComponent extends Modal implements OnInit {
  TITLE_HEADER_FORM = 'Permisos';
  errorInForm: string[] = [];

  constructor(
    private menuNodeService: MenuNodeService,
    private modalService: ModalService,
    private alertService: AlertService,
  ) {
    super();
  }

  menuNodeAction: MenuNodeAction;
  menuNodeToTree: MenuNodeAction[];
  BTN_TOOL = ActionButton.MINI_OPEN;


  initialRolMenu: RolMenu;

  modalInput(rolMenu: any): void {
    this.initialRolMenu = rolMenu;
  }

  ngOnInit(): void {
    this.getMenuNode(this.initialRolMenu);
  }

  getMenuNode(rolMenu: any) {
    this.menuNodeService.getRolMenuNode(rolMenu.id).subscribe(
      (resultGetMenuNode) => {
        this.menuNodeAction = MenuNodeAction.createMenuNodeRecursive(
          resultGetMenuNode[0]
        );
        this.menuNodeToTree = [this.menuNodeAction];
      },
      (errorArray) => {
        this.alertService.openAlertWarning(errorArray);
      }
    );
  }

  actionFormEvent($event) {
    switch ($event) {
      case ActionGeneric.CLOSE:
        this.modalClose();
        break;
    }
  }

  OpenActionSecurity(idMenu: string) {
    this.editRolMenuActionComponentOpenModal(idMenu);
  }

  editRolMenuActionComponentOpenModal(idMenu: string): void {
    let param = {
      idRolMenu: this.initialRolMenu.id,
      idMenu: idMenu,
    };
    const modalRef = this.modalService.open(EditRolMenuActionComponent, param);
    modalRef.onResult().subscribe((closed) => {
      this.getMenuNode(this.initialRolMenu);
    });
  }
}
