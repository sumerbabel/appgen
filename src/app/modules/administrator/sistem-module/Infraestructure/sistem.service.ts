import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpApiService } from 'src/app/modules/core/http-service/http-api.service';
import { environment } from 'src/environments/environment';
import { SistemGateway } from '../domain/sistem-gateway';

@Injectable({
  providedIn: 'root',
})
export class SistemService extends SistemGateway {
  constructor(private httpApiService: HttpApiService) {
    super();
    this.httpApiService.setUrlBaseResource(environment.apiUrl);
  }
  private RESOURCE_RUTE: string = 'sistems';

  getById(id: any = ''): Observable<any> {
    return this.httpApiService
      .getResource(`${this.RESOURCE_RUTE}/${id}`)
      .pipe(map((response: any) => response));
  }

  getByFilter(objectFilter:any): Observable<any> {
    return this.httpApiService
      .getResourceFilter(objectFilter,`${this.RESOURCE_RUTE}`)
      .pipe(map((response: any) => response));
  }


  getByList(id: any = ''): Observable<any> {
    return this.httpApiService
      .getResource(`${this.RESOURCE_RUTE}/list`)
      .pipe(map((response: any) => response));
  }

  saveNew(obj: any): Observable<any> {
    return this.httpApiService
      .postResource(obj, `${this.RESOURCE_RUTE}`)
      .pipe(map((response: any) => response));
  }

  saveChanges(obj: any): Observable<any> {
    return this.httpApiService
      .putResource(obj, `${this.RESOURCE_RUTE}`)
      .pipe(map((response: any) => response));
  }

  deleteById(id: any): Observable<any> {
    return this.httpApiService
      .deleteResource(`${this.RESOURCE_RUTE}/${id}`)
      .pipe(map((response: any) => response));
  }
}
