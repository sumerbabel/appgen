import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
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
  constructor(private sanitizer: DomSanitizer) {}
  multiple: string;
  webkitdirectory: string;

  ngOnInit(): void {
    if (this.isMultiple) {
      this.multiple = 'multiple';
    } else {
      this.multiple = '';
    }
  }
  //files:[];
  filex=[]
  changeControlEvent(event: any) {
    this.inputControlChange.emit(event);
    this.countArchives = event.target.files.length;

  }

  onFileDropped($event) {
    console.log('event files', $event)
    let files :[] =$event
    for (let index = 0; index < files.length; index++)
    {
      let fileresult = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(files[index]));
      let obj={file:files[index],name:files[index]['name'],size:files[index]['size'],type:files[index]['type'], url:fileresult}
      this.filex.push(obj);

    }

    console.log('FILES',this.filex)

  }

  fileBrowseHandler($event){
    console.log('ENVENTO DRAGG CHANGE', $event)
  }




}
