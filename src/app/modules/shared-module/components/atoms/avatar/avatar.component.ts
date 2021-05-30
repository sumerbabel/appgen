import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ui-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvatarComponent implements OnInit {
  @Output('on-click') onClickEvent: EventEmitter<any> = new EventEmitter();
  @Input() name: string='US';
  constructor() { }
  ngOnInit() {
  }

  onClic() {
    this.onClickEvent.emit();
  }

}
