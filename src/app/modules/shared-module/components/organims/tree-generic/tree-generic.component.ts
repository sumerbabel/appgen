import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { ActionButton } from '@sharedModule/enums-object/action-button';
import { TreeGeneric } from './domain/tree.generic';

@Component({
  selector: 'ui-tree-generic',
  templateUrl: './tree-generic.component.html',
  styleUrls: ['./tree-generic.component.scss'],
})
export class TreeGenericComponent implements OnInit {
  @Input() isNodeInitial: boolean = true;
  @Input() templateBody: TemplateRef<any>;
  @Input() templateHeader: TemplateRef<any>;
  @Input() treeObject: TreeGeneric[];
  @Input() treeObjectParent: TreeGeneric;

  propertiesButton;
  constructor() {}
  ngOnInit(): void {
    if (this.treeObject[0]._isOpen) {
      this.propertiesButton = ActionButton.COMPRESS;
    } else {
      this.propertiesButton = ActionButton.EXPAND;
    }
  }

  public toggleExpand(node: TreeGeneric): void {
    node._isOpen=!node._isOpen;
  }

  toggleExpandAll() {
    if (this.treeObject[0]._isOpen) {
      this.propertiesButton = ActionButton.EXPAND;
      this.treeObject[0].setIsOpenAllNode(false);
    } else {
      this.propertiesButton = ActionButton.COMPRESS;
      this.treeObject[0].setIsOpenAllNode(true);
    }
  }
}
