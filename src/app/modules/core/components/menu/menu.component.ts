import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MenuActions } from '../../security/domain/menu-actions';
import { AccountService } from '../../security/service/account.service';
import { MenuTree } from './domain/menu-tree';
import { MenuService } from './services/menu.service';

@Component({
  selector: 'ui-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  menuTree: MenuTree[] = [];
  @Output() nodeEvent = new EventEmitter<any>();
  constructor(
    private menuService: MenuService,
    private accountService: AccountService
  ) {
  }

  ngOnInit(): void {
    this.menu();
  }

  menu() {
    this.menuService.getMenuUser().subscribe((menuResult: any[]) => {
      menuResult.forEach((item) => {
        this.menuTree.push(MenuTree.createMenuNodeRecursive(item));
      });
let MenuActionsList :Array<MenuActions> =this.menuTree[0].getMenuList();
      this.accountService.setMenuListSession(MenuActionsList)
    });
  }

  eventmenu(event: any) {
    if (event['type'] == 'ROUTER') {
      this.nodeEvent.emit(event);
    }
  }
}
