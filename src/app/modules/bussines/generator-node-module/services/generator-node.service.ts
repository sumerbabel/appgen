import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpApiService } from 'src/app/modules/core/http-service/http-api.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})

export class GeneratorNodeService {
  constructor(private httpApiService: HttpApiService) {
    this.httpApiService.setUrlBaseResource(environment.apiUrl);
  }
  private RESOURCE_RUTE: string = 'generatorNodes';

  getGeneratorNode(id: string): Observable<any> {
    return this.httpApiService
      .getResource(`${this.RESOURCE_RUTE}/${id}`)
      .pipe(map((response: any) => response));
  }

  getByTypeGeneratorNode(idType: string): Observable<any> {
    return this.httpApiService
      .getResource(`${this.RESOURCE_RUTE}/type/${idType}`)
      .pipe(map((response: any) => response));
  }

  postGeneratorNode(obj: any): Observable<any> {
    return this.httpApiService
      .postResource(obj, `${this.RESOURCE_RUTE}`)
      .pipe(map((response: any) => response));
  }

  putGeneratorNode(obj: any): Observable<any> {
    return this.httpApiService
      .putResource(obj, `${this.RESOURCE_RUTE}`)
      .pipe(map((response: any) => response));
  }

  deleteGeneratorNode(id: any): Observable<any> {
    return this.httpApiService
      .deleteResource(`${this.RESOURCE_RUTE}/${id}`)
      .pipe(map((response: any) => response));
  }
}
