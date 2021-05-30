import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpApiService } from 'src/app/core-context/http-resurce/http-api.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ObjetGenService {

  constructor(private  httpApiService:HttpApiService) {
    this.httpApiService.setUrlBaseResource(environment.apiUrl);
  }
private  RESOURCE_RUTE:string = 'objetGens'
  getObjetGen(id: any =''): Observable<any> {

    return this.httpApiService.getResource(`${this.RESOURCE_RUTE}/${id}`)
      .pipe(
        map((response: any) => response)
      );
  }


 postObjetGen(obj: any): Observable<any> {
    return this.httpApiService.postResource(obj, `${this.RESOURCE_RUTE}`)
      .pipe(
        map((response: any) => response)
      );
  }

  putObjetGen(obj: any): Observable<any> {
    return this.httpApiService.putResource(obj, `${this.RESOURCE_RUTE}`)
      .pipe(
        map((response: any) => response)
      );
  }

  deleteObjetGen(id: any): Observable<any> {

    return this.httpApiService.deleteResource(`${this.RESOURCE_RUTE}/${id}`)
      .pipe(
        map((response: any) => response)
      );
  }
}
