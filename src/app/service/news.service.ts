import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProcessHTTPMsgService } from "./process-http.service";
import { DataItem } from '../shared/DataItem';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};
@Injectable({
  providedIn: "root"
})
export class NewsService {

  newsURL = 'http://10.0.2.2:3000/news/';

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService){}

    getNews(): Observable<DataItem[]> {
      return this.http.get<DataItem[]>(this.newsURL)
      .pipe(catchError(this.processHTTPMsgService.handleError));
    }

    getNew(id: number): Observable<DataItem> {
        return this.http.get<DataItem>(this.newsURL + id)
        .pipe(catchError(this.processHTTPMsgService.handleError));
    }
}
