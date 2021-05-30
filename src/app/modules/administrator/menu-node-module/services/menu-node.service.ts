import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpApiService } from 'src/app/modules/core/http-service/http-api.service';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MenuNodeService {
  constructor(private httpApiService: HttpApiService) {
    this.httpApiService.setUrlBaseResource(environment.apiUrl);
  }
  private RESOURCE_RUTE: string = 'menuNodes';

  getMenuNode(id: any = ''): Observable<any> {
    return this.httpApiService
      .getResource(`${this.RESOURCE_RUTE}/${id}`)
      .pipe(map((response: any) => response));
  }

  getRolMenuNode(idRol: any = ''): Observable<any> {
    return this.httpApiService
      .getResource(`${this.RESOURCE_RUTE}/rol/${idRol}`)
      .pipe(map((response: any) => response));
  }

  getListMenuNode(idModule: any = ''): Observable<any> {
    return this.httpApiService
      .getResource(`${this.RESOURCE_RUTE}/list/${idModule}`)
      .pipe(map((response: any) => response));
  }

  postMenuNode(obj: any): Observable<any> {
    return this.httpApiService
      .postResource(obj, `${this.RESOURCE_RUTE}`)
      .pipe(map((response: any) => response));
  }

  putMenuNode(obj: any): Observable<any> {
    return this.httpApiService
      .putResource(obj, `${this.RESOURCE_RUTE}`)
      .pipe(map((response: any) => response));
  }

  patchMenuNode(obj: any): Observable<any> {
    return this.httpApiService
      .patchResource(obj, `${this.RESOURCE_RUTE}`)
      .pipe(map((response: any) => response));
  }

  deleteMenuNode(id: any): Observable<any> {
    return this.httpApiService
      .deleteResource(`${this.RESOURCE_RUTE}/${id}`)
      .pipe(map((response: any) => response));
  }
}
