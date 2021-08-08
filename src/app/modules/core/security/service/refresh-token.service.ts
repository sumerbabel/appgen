import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { HttpApiService } from '../../http-service/http-api.service';
@Injectable({
  providedIn: 'root'
})
export class RefreshTokenService {

  constructor(private  httpApiService:HttpApiService) {
    this.httpApiService.setUrlBaseResource(environment.apiUrl);
  }

 private  RESOURCE_RUTE:string = 'refreshtoken'

 postRefreshToken(): Observable<any> {
    return this.httpApiService.postResource('',this.RESOURCE_RUTE)
      .pipe(
        map((response: any) => response)
      );
  }

}
