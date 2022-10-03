import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { ViewFileService } from './view-file.service';
import { DomSanitizer } from '@angular/platform-browser';
import { getMatIconFailedToSanitizeLiteralError } from '@angular/material/icon';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'ui-view-file',
  templateUrl: './view-files.component.html',
  styleUrls: ['./view-files.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ViewFilesComponent implements OnInit {
  @Input() urlsFile: string = environment.apiUrl+'/file/download';
  @Input() filesId: any[];
  files = [];
  isImageLoading: boolean;
  urlFileApi: string;
  fileDataResult: fileData[] = [];
  constructor(private viewFileService: ViewFileService, private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {

    this.filesId.forEach(
      fileId => {

        this.getImageFromService(this.urlsFile, fileId);
      }
    )
  }

  createImageFromBlob(image: Blob, field: any) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      let fileresult = reader.result;
      this.files.push(fileresult);
      let filedata: fileData = {
        type: 'image',
        urlFile: fileresult,
        name: field.original_file_name,
        icon: this.txtIcon(field.file_type)
      }

      this.fileDataResult.push(filedata);
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  createFileFromBlob(file: Blob, field: any) {
    const blob = new Blob([file], { type: 'application/octet-stream' });
    let fileresult = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));

    let filedata: fileData = {
      type: 'file',
      urlFile: fileresult,
      name: field.original_file_name,
      icon: this.txtIcon(field.file_type)
    }
    this.fileDataResult.push(filedata);
  }

  getImageFromService(urlFile: string, fileId: any) {
    this.isImageLoading = true;
    this.viewFileService.getFile(urlFile, fileId.id).subscribe(data => {
      if (data.type === 'image/jpeg') {
        this.createImageFromBlob(data, fileId);
      } else {
        this.createFileFromBlob(data, fileId)
      }
      this.isImageLoading = false;
    }, error => {
      this.isImageLoading = false;
    });
  }

  txtIcon(extension: string) {
    switch (extension) {
      case 'zip':
        return 'fa fa-file-archive-o'
      case 'jpg':
        return 'fa fa-file-image-o'
      case 'jpeg':
        return 'fa fa-file-image-o'
      case 'docx':
        return 'fa fa-file-word-o'
      case 'pdf':
        return 'fa fa-file-pdf-o'
      default:
        return 'fa fa-file-o'
    }
  }

}


export interface fileData {
  urlFile: any;
  type: any;
  name?: string;
  icon?: string;
}
