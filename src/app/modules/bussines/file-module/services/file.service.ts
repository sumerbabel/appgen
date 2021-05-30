import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpApiService } from 'src/app/modules/core/http-service/http-api.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor(private httpApiService: HttpApiService) {
    this.httpApiService.setUrlBaseResource(environment.apiUrl);
  }

  private RESOURCE_RUTE: string = 'files';

  getFile(id: any = ''): Observable<any> {
    return this.httpApiService
      .getResource(`${this.RESOURCE_RUTE}/${id}`)
      .pipe(map((response: any) => response));
  }

  getFileAsociate(idAsociate: string): Observable<any> {
    return this.httpApiService
      .getResource(`${this.RESOURCE_RUTE}/asociate/${idAsociate}`)
      .pipe(map((response: any) => response as any));
  }

  getDownloadFile(id: string): Observable<Blob> {
    return this.httpApiService
      .getResourceFile(`${this.RESOURCE_RUTE}/download/${id}`)
      .pipe(map((response: any) => response as Blob));
  }

  postFile(obj: any): Observable<any> {
    return this.httpApiService
      .postResource(obj, `${this.RESOURCE_RUTE}`)
      .pipe(map((response: any) => response));
  }

  putFile(obj: any): Observable<any> {
    return this.httpApiService
      .putResource(obj, `${this.RESOURCE_RUTE}`)
      .pipe(map((response: any) => response));
  }

  deleteFile(id: any): Observable<any> {
    return this.httpApiService
      .deleteResource(`${this.RESOURCE_RUTE}/${id}`)
      .pipe(map((response: any) => response));
  }
}
