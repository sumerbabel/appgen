import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpApiService } from 'src/app/modules/core/http-service/http-api.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SistemService {
  constructor(private httpApiService: HttpApiService) {
    this.httpApiService.setUrlBaseResource(environment.apiUrl);
  }
  private RESOURCE_RUTE: string = 'sistems';

  getSistem(id: any = ''): Observable<any> {
    return this.httpApiService
      .getResource(`${this.RESOURCE_RUTE}/${id}`)
      .pipe(map((response: any) => response));
  }

  getSistemFilter(objectFilter:any): Observable<any> {
    return this.httpApiService
      .getResourceFilter(objectFilter,`${this.RESOURCE_RUTE}`)
      .pipe(map((response: any) => response));
  }


  getSistemList(id: any = ''): Observable<any> {
    return this.httpApiService
      .getResource(`${this.RESOURCE_RUTE}/list`)
      .pipe(map((response: any) => response));
  }

  postSistem(obj: any): Observable<any> {
    return this.httpApiService
      .postResource(obj, `${this.RESOURCE_RUTE}`)
      .pipe(map((response: any) => response));
  }

  putSistem(obj: any): Observable<any> {
    return this.httpApiService
      .putResource(obj, `${this.RESOURCE_RUTE}`)
      .pipe(map((response: any) => response));
  }

  deleteSistem(id: any): Observable<any> {
    return this.httpApiService
      .deleteResource(`${this.RESOURCE_RUTE}/${id}`)
      .pipe(map((response: any) => response));
  }
}
