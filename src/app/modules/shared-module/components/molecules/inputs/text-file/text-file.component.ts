import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { IinputControl } from '../input.interface';

@Component({
  selector: 'ui-input-file',
  templateUrl: './text-file.component.html',
  styleUrls: ['./text-file.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextFileComponent implements OnInit {
  countArchives = 0;
  @Output() inputControlChange = new EventEmitter<any>();
  @Input() accept: string = 'image/*,.zip,.doc,.pdf,.docx';
  @Input() isMultiple: boolean = false;
  @Input() isSelectDirectory: boolean = false;
  constructor() {}
  multiple: string;
  webkitdirectory: string;

  ngOnInit(): void {
    if (this.isMultiple) {
      this.multiple = 'multiple';
    } else {
      this.multiple = '';
    }
  }
  files:[];
  filex=[]
  changeControlEvent(event: any) {
    this.inputControlChange.emit(event);
    this.countArchives = event.target.files.length;

  }

  onFileDropped($event) {
    this.files =$event
    for (let index = 0; index < this.files.length; index++)
    {  let obj={file:this.files[index],name:this.files[index]['name'],size:this.files[index]['size'],type:this.files[index]['type']}
      this.filex.push(obj);

    }

    console.log('FILES',this.filex)

  }

  fileBrowseHandler($event){
    console.log('ENVENTO DRAGG CHANGE', $event)
  }




}
