import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountService } from '../../security/service/account.service';
import { MenuTree } from './domain/menu-tree';
import { MenuService } from './services/menu.service';

@Component({
  selector: 'ui-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  @Input() menuTree: MenuTree[] = [];
  @Output() nodeEvent = new EventEmitter<any>();
  constructor(
  ) {
  }

  ngOnInit(): void {
  }
  eventmenu(event: any) {
    if (event['type'] == 'ROUTER') {
      this.nodeEvent.emit(event);
    }
  }
}
