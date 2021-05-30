import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
    private accountService: AccountService,
    private menuService: MenuService
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
    });
  }

  eventmenu(event: any) {
    if (event['type'] == 'ROUTER') {
      this.nodeEvent.emit(event['rute']);
    }
  }
}
