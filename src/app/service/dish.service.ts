import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';

import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProcessHTTPMsgService } from './process-http.service';
import { baseURL } from '../shared/baseUrl';

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'my-auth-token'
    })
  };

@Injectable({
  providedIn: 'root'
})
export class DishService {
    private serverUrl = "https://swopt.com:5000/";

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

    getData() {
        let headers = this.createRequestHeader();
        return this.http.get(this.serverUrl + 'dishes/', { headers: headers });
    }

    private createRequestHeader() {
        // set headers here e.g.
        let headers = new HttpHeaders({
            "AuthKey": "my-key",
            "AuthToken": "my-token",
            "Content-Type": "application/json",
         });

        return headers;
    }

  getDishes(): Observable<Dish[]> {
    return this.http.get<Dish[]>(this.serverUrl + 'dishes/')
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getDish(id: number): Observable<Dish> {
    return this.http.get<Dish>(this.serverUrl + 'dishes/' + id)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getFeaturedDish(): Observable<Dish> {
    return this.http.get<Dish[]>(this.serverUrl + 'dishes/' + '?featured=true').pipe(map(dishes => dishes[0]))
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
