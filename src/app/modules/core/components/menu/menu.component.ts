import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MenuTree } from './domain/menu-tree';


@Component({
  selector: 'ui-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush

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
