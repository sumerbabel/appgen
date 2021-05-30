import { Component, OnInit, EventEmitter, TemplateRef, Input, Output } from '@angular/core';
import { TreeBase } from '../../tree-menu/domain/tree-base';
import { ModelData } from '@sharedModule/models-core/ModelData';

@Component({
  selector: 'ui-tree-rx',
  templateUrl: './tree-rx.component.html',
  styleUrls: ['./tree-rx.component.scss']
})
export class TreeRxComponent<T extends ModelData> implements OnInit {

  @Input() isInitial: boolean = true;
  @Output() nodeEvent = new EventEmitter<any>();
  @Input() templateBody: TemplateRef<any>
  @Input() templateHeader: TemplateRef<any>
  @Input() tree:TreeBase<T>;
  @Input() treeData:TreeBase<T>[];
  @Input() treeDataComplete:TreeBase<T>;
  @Input() treeParent:TreeBase<T>;

  constructor() { }
  
  ngOnInit(): void {
    if (this.isInitial){
      this.treeData=[this.tree];
      this.treeDataComplete=this.treeData[0];
      this.toggleNodesTree();
    }
  }

  public toggleNode(node): void {
    node.isOpen = !node.isOpen
  }

  nodeSelected(node){
    this.nodeEvent.emit(node);
  }

  textToogleButton: string = 'Contraer';
  iconToggleButton: string = 'fa fa-compress';
  colorToggleButton: string = '#1c596a';

  toggleNodesTree() {
   if (this.tree.getIsOpenNode()) {
      this.tree.closeNodeAll();
      this.textToogleButton = 'Expandir';
      this.iconToggleButton = 'fa fa-expand';
      this.colorToggleButton = '#2d60a8';
    } else {
      this.tree.openNodeAll();
      this.textToogleButton = 'Contraer';
      this.iconToggleButton = 'fa fa-compress';
      this.colorToggleButton = '#1c596a';
    }

  }

}
