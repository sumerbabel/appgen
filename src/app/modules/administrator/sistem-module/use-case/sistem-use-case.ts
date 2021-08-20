import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Sistem } from "../domain/sistem";
import { SistemGateway } from "../domain/sistem-gateway";

@Injectable({
    providedIn: 'root'
  })
  
  export class SistemUseCases {
    constructor( private _sistemGateway: SistemGateway) {}  

     getById(id: String): Observable<Sistem>{
         return this._sistemGateway.getById(id);
     }
     getByFilter(objectFilter:any): Observable<Array<Sistem>>{
        return this._sistemGateway.getByFilter(objectFilter);
    }
     getByList(id: any): Observable<Array<Sistem>>{
        return this._sistemGateway.getByList(id);
    }
     saveNew (object :any) : Observable<any>{
        return this._sistemGateway.saveNew(object);
    }
     saveChanges (object :any) : Observable<any>{
        return this._sistemGateway.saveChanges(object);
    }
     deleteById(id: String): Observable<any>{
        return this._sistemGateway.deleteById(id);
    }

  
  }