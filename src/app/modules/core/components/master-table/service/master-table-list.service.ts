import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpApiService } from '../../../http-service/http-api.service';

@Injectable({
  providedIn: 'root'
})
export class MasterTableList{
  constructor(private httpApiService: HttpApiService) {
    this.httpApiService.setUrlBaseResource(environment.apiUrl + '/api/');
  }
  private RESOURCE_RUTE: string = 'masterListItems'

  getByMasterList(id: string): Observable<any[]> {

    return this.httpApiService.getResource(`${this.RESOURCE_RUTE}/masterList/${id}`)
      .pipe(
        map((response: any) => response as any[])
      );
  }

}
