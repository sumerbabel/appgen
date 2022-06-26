import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import * as internal from 'stream';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit {
  @Input() templateBody: TemplateRef<any>;
  @Input() tabItems: tab[];
  constructor() { }

  ngOnInit() {
  }

}

export interface tab{
  name:string,
  order:Number,
  isActive:boolean

}
