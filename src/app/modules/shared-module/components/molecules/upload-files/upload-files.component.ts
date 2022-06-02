import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { UploadFileService } from './upload-file.service';
import { FormGroup } from '@angular/forms';
import { IinputControl } from '../inputs/input.interface';
import { InputControl } from '../inputs/input.model';

@Component({
  selector: 'ui-upload-file',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class UploadFilesComponent implements OnInit {
  @Input() urlSerivceHttp:string ='http://127.0.0.1/uploadfile';
  @Input() uuid: string;
  @Input() accept:string = 'image/*'
  @Input() isMultiple :boolean = true;
  @Output() ControlChange = new EventEmitter<any[]>();
  @Output() ServiceResult = new EventEmitter<any[]>();
  files:[];

  constructor(private uploadFileService: UploadFileService) { }

  ngOnInit() {
  }

  changeValues(event) {
    if (event.target.files.length > 0) {
      this.files = event.target.files;
    }

  }

  uploadFile() {
    const formData = new FormData();
    for (let index = 0; index < this.files.length; index++)
    {
     formData.append('filenames[]', this.files[index]);
     formData.append('uuid', this.uuid);
    }

    this.uploadFileService.upload(formData, this.urlSerivceHttp).subscribe(
      (res) => {
             this.ServiceResult.emit(res.data)
      },
      (err) => {
        console.log(err);
      }
    )

  }

}
