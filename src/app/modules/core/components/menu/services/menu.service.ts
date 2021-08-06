import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpApiService } from '../../../http-service/http-api.service';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  constructor(private httpApiService: HttpApiService) {
    this.httpApiService.setUrlBaseResource(environment.apiUrl);
  
  }
  private RESOURCE_RUTE: string = 'menuNodes';

  getMenuUser(): Observable<any> {
    return this.httpApiService
      .getResource(`${this.RESOURCE_RUTE}/menu`)
      .pipe(map((response: any) => response));
  }

}
