import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpApiService } from 'src/app/modules/core/http-service/http-api.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TableItemService {

  constructor(private  httpApiService:HttpApiService) {
    this.httpApiService.setUrlBaseResource(environment.apiUrl);
  }
private  RESOURCE_RUTE:string = 'tableItems'

  getTableItem(id: any =''): Observable<any> {
    let slash =''
    if (id){
      slash='/'
    }
    return this.httpApiService.getResource(`${this.RESOURCE_RUTE}${slash}${id}`)
      .pipe(
        map((response: any) => response)
      );
  }

  getItemsTableMaster(idTable: string): Observable<any> {
    return this.httpApiService.getResource(`${this.RESOURCE_RUTE}/all/${idTable}`)
      .pipe(
        map((response: any) => response)
      );
  }

  getAllTableItem(idTable: any =''): Observable<any> {
    return this.httpApiService.getResource(`${this.RESOURCE_RUTE}/all/${idTable}`)
      .pipe(
        map((response: any) => response)
      );
  }

 postTableItem(obj: any): Observable<any> {
    return this.httpApiService.postResource(obj, `${this.RESOURCE_RUTE}`)
      .pipe(
        map((response: any) => response)
      );
  }

  putTableItem(obj: any): Observable<any> {
    return this.httpApiService.putResource(obj, `${this.RESOURCE_RUTE}`)
      .pipe(
        map((response: any) => response)
      );
  }

  deleteTableItem(id: any): Observable<any> {
    return this.httpApiService.deleteResource(`${this.RESOURCE_RUTE}/${id}`)
      .pipe(
        map((response: any) => response)
      );
  }
}
