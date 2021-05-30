import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewFileService {
  constructor(private httpClient: HttpClient) { }
 
  
  getFile(fileUrl: string, fileId:string): Observable<Blob> {
    return this.httpClient.get(fileUrl+'/'+fileId, { responseType: 'blob' });
  }
}
