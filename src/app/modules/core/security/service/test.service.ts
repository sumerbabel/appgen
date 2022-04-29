import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { HttpApiService } from '../../http-service/http-api.service';
@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private  httpApiService:HttpApiService) {
   
  }

  apiLocalUrl:'http://localhost:81/api/'
  apiExternalUrl:'https://jsonplaceholder.typicode.com/'

 private  RESOURCE_RUTE:string = 'users'
 private  RESOURCE_RUTE2:string = 'test'

 getTest(obj: any): Observable<any> {
    this.httpApiService.setUrlBaseResource(environment.apiExternalUrl);
    return this.httpApiService.getResource(this.RESOURCE_RUTE)
      .pipe(
        map((response: any) => response)
      );
  }

getTestLocal(obj: any): Observable<any> {
    this.httpApiService.setUrlBaseResource(environment.apiLocalUrl);
    return this.httpApiService.getResource(this.RESOURCE_RUTE2)
      .pipe(
        map((response: any) => response)
      );
  }  

}
