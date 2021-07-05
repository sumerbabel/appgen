import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpApiService } from 'src/app/modules/core/http-service/http-api.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RolMenuService {

  constructor(private  httpApiService:HttpApiService) {
    this.httpApiService.setUrlBaseResource(environment.apiUrl);
  }
private  RESOURCE_RUTE:string = 'rolMenus'

  getRolMenu(id: any =''): Observable<any> {
    let slash =''
    if (id){
      slash='/'
    }
    return this.httpApiService.getResource(`${this.RESOURCE_RUTE}${slash}${id}`)
      .pipe(
        map((response: any) => response)
      );
  }

  getAllRolMenu(idRol: any =''): Observable<any> {
    return this.httpApiService.getResource(`${this.RESOURCE_RUTE}/all/${idRol}`)
      .pipe(
        map((response: any) => response)
      );
  }


 postRolMenu(obj: any): Observable<any> {
    return this.httpApiService.postResource(obj, `${this.RESOURCE_RUTE}`)
      .pipe(
        map((response: any) => response)
      );
  }

  putRolMenu(obj: any): Observable<any> {
    return this.httpApiService.putResource(obj, `${this.RESOURCE_RUTE}`)
      .pipe(
        map((response: any) => response)
      );
  }

  deleteRolMenu(id: any): Observable<any> {

    return this.httpApiService.deleteResource(`${this.RESOURCE_RUTE}/${id}`)
      .pipe(
        map((response: any) => response)
      );
  }
}
