import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpApiService } from 'src/app/modules/core/http-service/http-api.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SecurityRolService {
  constructor(private httpApiService: HttpApiService) {
    this.httpApiService.setUrlBaseResource(environment.apiUrl);
  }
  private RESOURCE_RUTE: string = 'securityRols';

  getSecurityRol(id: any = ''): Observable<any> {
    let slash =''
    if (id){
      slash='/'
    }
    return this.httpApiService
      .getResource(`${this.RESOURCE_RUTE}${slash}${id}`)
      .pipe(map((response: any) => response));
  }

  getListSecurityRol(idSistem: any = ''): Observable<any> {
    return this.httpApiService
      .getResource(`${this.RESOURCE_RUTE}/list/${idSistem}`)
      .pipe(map((response: any) => response));
  }

  postSecurityRol(obj: any): Observable<any> {
    return this.httpApiService
      .postResource(obj, `${this.RESOURCE_RUTE}`)
      .pipe(map((response: any) => response));
  }

  putSecurityRol(obj: any): Observable<any> {
    return this.httpApiService
      .putResource(obj, `${this.RESOURCE_RUTE}`)
      .pipe(map((response: any) => response));
  }

  deleteSecurityRol(id: any): Observable<any> {
    return this.httpApiService
      .deleteResource(`${this.RESOURCE_RUTE}/${id}`)
      .pipe(map((response: any) => response));
  }
}
