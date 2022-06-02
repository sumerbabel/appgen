import {
  Component,
  OnInit,
  EventEmitter,
  Input,
  Output,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Router } from '@angular/router';

import { TreeGeneric } from '../tree-generic/domain/tree.generic';

@Component({
  selector: 'ui-menu-ml',
  templateUrl: './menu-ml.component.html',
  styleUrls: ['./menu-ml.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class MenuMlComponent implements OnInit {
  @Input() isInitial: boolean = true;
  @Output() nodeEvent = new EventEmitter<any>();
  @Input() treeData: TreeGeneric[];
  @Input() nodeLevel: number = 1;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  public toggleNode(node): void {
    node.isOpen = !node.isOpen;
  }

  itemSelected=null
  nodeSelected(node: TreeGeneric, index?) {
    let rute ='';
    let type ='MENU_LEVEL';
    let actions_rol =[];
    if (node['_children']?.length > 0) {

      this.toggleNode(node);
    } else {
      this.itemSelected =index;
      type ='ROUTER'
      rute = node['_menu']['_ruteWeb'];
      actions_rol =String(node['_menu']['_actionsRol']).split(",");

    }
    this.nodeSelectEmit({type:type,rute:rute,actions_rol:actions_rol})
  }

  nodeSelectEmit(even){
    this.nodeEvent.emit(even);
  }
}
