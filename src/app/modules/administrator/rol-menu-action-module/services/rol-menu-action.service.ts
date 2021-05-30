import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpApiService } from 'src/app/modules/core/http-service/http-api.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RolMenuActionService {

  constructor(private  httpApiService:HttpApiService) {
    this.httpApiService.setUrlBaseResource(environment.apiUrl);
  }
private  RESOURCE_RUTE:string = 'rolMenuActions'

  getRolMenuAction(id: any =''): Observable<any> {

    return this.httpApiService.getResource(`${this.RESOURCE_RUTE}/${id}`)
      .pipe(
        map((response: any) => response)
      );
  }


  getAllRolMenuAction(idRolMenu:string, idMenu:string): Observable<any> {
    let param={
      idRolMenu:idRolMenu,
      idMenu:idMenu
    }
    return this.httpApiService.getResourceFilter(param,`${this.RESOURCE_RUTE}/all/`)
      .pipe(
        map((response: any) => response)
      );
  }



 postRolMenuAction(obj: any): Observable<any> {
    return this.httpApiService.postResource(obj, `${this.RESOURCE_RUTE}`)
      .pipe(
        map((response: any) => response)
      );
  }

  putRolMenuAction(obj: any): Observable<any> {
    return this.httpApiService.putResource(obj, `${this.RESOURCE_RUTE}`)
      .pipe(
        map((response: any) => response)
      );
  }

  deleteRolMenuAction(id: any): Observable<any> {

    return this.httpApiService.deleteResource(`${this.RESOURCE_RUTE}/${id}`)
      .pipe(
        map((response: any) => response)
      );
  }
}
