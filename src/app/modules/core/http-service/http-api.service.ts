import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class HttpApiService {

  private urlBaseResource: string = '';

  constructor(private httpClient: HttpClient) {
  }

  setUrlBaseResource(urlBaseResource: string): void {
    this.urlBaseResource = urlBaseResource;
  }

  getUrlBaseResource(): string {
    return this.urlBaseResource;
  }

 getResource( resourceUrl: string = ''): Observable<any> {
    return this.httpClient.get(`${this.getUrlBaseResource()}${resourceUrl}`)
      .pipe(
        map((response: any) =>response)
      );
  }

  getResourceFilter(obj: any, resourceUrl: string = ''): Observable<any> {

    let params = this.httParansOnObject(obj);

    return this.httpClient.get(`${this.getUrlBaseResource()}${resourceUrl}`,  { params })
      .pipe(
        map((response: any) => response)
      );
  }

  getResourceFile( resourceUrl: string = ''): Observable<Blob> {
    return this.httpClient.get(`${this.getUrlBaseResource()}${resourceUrl}`, { responseType: 'blob' });
  }

  postResource (obj: any,resourceUrl: string ): Observable<any>{

    return this.httpClient.post(`${this.getUrlBaseResource()}${resourceUrl}`, obj)
    .pipe(
      map((response: any) => response),
    );
  }

  putResource (obj: any,resourceUrl: string ): Observable<any>{
    return this.httpClient.put(`${this.getUrlBaseResource()}${resourceUrl}`, obj)
    .pipe(
      map((response: any) => response)
    );
  }

  patchResource(obj: any,resourceUrl: string ): Observable<any>{
    return this.httpClient.patch(`${this.getUrlBaseResource()}${resourceUrl}`, obj)
    .pipe(
      map((response: any) => response)
    );
  }

  deleteResource (resourceUrl: string ): Observable<any>{

    return this.httpClient.delete(`${this.getUrlBaseResource()}${resourceUrl}`)
    .pipe(
      map((response: any) => response)
    );
  }

  httParansOnObject(object: any) {
    let httpParams = new HttpParams()
    Object.keys(object).forEach(function (key) {
      if(object[key]!=null && object[key]!=undefined && object[key]!=''){
        httpParams = httpParams.append(key, object[key]);
      }
    });
    return httpParams
  }

}
