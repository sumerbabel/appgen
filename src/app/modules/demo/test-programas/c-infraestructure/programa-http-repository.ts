import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { HttpApiService } from "src/app/modules/core/http-service/http-api.service";
import { environment } from "src/environments/environment";
import { ProgramaDto } from "../a-domain/programa-dto";
import { ProgramaRepository } from "../a-domain/programa-repository";

@Injectable({
  providedIn: 'root',
})
export class ProgramaHttpRepository implements ProgramaRepository {


  constructor(private httpApiService: HttpApiService) {
    this.httpApiService.setUrlBaseResource(environment.apiUrl);
  }
  private RESOURCE_RUTE: string = 'sistems';

  // getById(id: any = ''): Observable<any> {
  //   return this.httpApiService
  //     .getResource(`${this.RESOURCE_RUTE}/${id}`)
  //     .pipe(map((response: any) => response));
  // }

  // getByFilter(objectFilter:any): Observable<any> {
  //   return this.httpApiService
  //     .getResourceFilter(objectFilter,`${this.RESOURCE_RUTE}`)
  //     .pipe(map((response: any) => response));
  // }


  // getByList(id: any = ''): Observable<any> {
  //   return this.httpApiService
  //     .getResource(`${this.RESOURCE_RUTE}/list`)
  //     .pipe(map((response: any) => response));
  // }

  // saveNew(obj: any): Observable<any> {
  //   return this.httpApiService
  //     .postResource(obj, `${this.RESOURCE_RUTE}`)
  //     .pipe(map((response: any) => response));
  // }

  // saveChanges(obj: any): Observable<any> {
  //   return this.httpApiService
  //     .putResource(obj, `${this.RESOURCE_RUTE}`)
  //     .pipe(map((response: any) => response));
  // }

  // deleteById(id: any): Observable<any> {
  //   return this.httpApiService
  //     .deleteResource(`${this.RESOURCE_RUTE}/${id}`)
  //     .pipe(map((response: any) => response));
  // }


  async findById(id: string): Promise<ProgramaDto> {
     const result =this.httpApiService.getResource(`${this.RESOURCE_RUTE}/${id}`)
     .pipe(map((response: ProgramaDto) => response));
    return result.toPromise()
  }

  async findArrayByIds(ids: string[]): Promise<ProgramaDto> {
    throw new Error("Method not implemented.");
  }
  async findList(parameter: string): Promise<ProgramaDto[]> {
    throw new Error("Method not implemented.");
  }
  async saveNew(parameter: ProgramaDto[]): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async saveChanges(parameter: ProgramaDto[]): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async delete(parameter: ProgramaDto[]): Promise<void> {
    throw new Error("Method not implemented.");
  }

}
