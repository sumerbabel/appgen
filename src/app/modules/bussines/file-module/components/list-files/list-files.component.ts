import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AlertService } from '@sharedModule/components/organims/alertForm/service/alert.service';
import { Modal } from '@sharedModule/components/organims/modal/model/modal.model';
import { FileApp } from '../../domain/fileApp';
import { FileService } from '../../services/file.service';

@Component({
  selector: 'ui-list-files',
  templateUrl: './list-files.component.html',
  styleUrls: ['./list-files.component.scss'],
})
export class ListFilesComponent extends Modal implements OnInit {
  @Input() idAsociate: string;
  constructor(
    private fileService: FileService,
    private sanitizer: DomSanitizer,
    private alertService: AlertService
  ) {
    super();
  }

  INITIAL_ID_ASOCIATE: string;
  files: FileApp[] =[];
  modalInput(idAsociate: string): void {
    if (idAsociate) {
      this.INITIAL_ID_ASOCIATE = idAsociate;
    }
  }

  getFilesAsociate(){
    this.fileService.getFileAsociate(this.INITIAL_ID_ASOCIATE).subscribe(result=>{
       let dataFiles =[];
       dataFiles =result;
       dataFiles.forEach(item=>{
        this.files.push( FileApp.createFile(item));
       })
    })
  }

  ngOnInit(): void {
    if (this.idAsociate) {
      this.INITIAL_ID_ASOCIATE = this.idAsociate;
      this.getFilesAsociate();
    }
  }

  downloadFile(file:FileApp){
    this.fileService.getDownloadFile(file.id).subscribe(resultFile=>{

      const url = window.URL.createObjectURL(resultFile);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.fileName;
      a.click();
      window.URL.revokeObjectURL(url);

    })

  }

}
