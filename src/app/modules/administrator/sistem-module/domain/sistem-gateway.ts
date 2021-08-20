import { Observable } from 'rxjs';
import { Sistem } from './sistem';


export abstract class SistemGateway {
    abstract getById(id: String): Observable<Sistem>;
    abstract getByFilter(objectFilter:any): Observable<Array<Sistem>>;
    abstract getByList(id: any): Observable<Array<Sistem>>;
    abstract saveNew (object :any) : Observable<any>;
    abstract saveChanges (object :any) : Observable<any>;
    abstract deleteById(id: String): Observable<any>;
} 