import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Product } from '../Models/Product';
import { CurrentPage } from '../Models/CurrentPage';

import { Constant } from '../Constant';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private REST_API_SERVICE = environment.api;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getCurrentPageOfProduct(sortBy: string = "product", sortValue: number, keyword: string = "", categoryId: number, page: number,
    limit: number = Constant.LIMIT_IN_PAGE)
    : Observable<CurrentPage> {
    var keywordParam = keyword !== "" ? `keyword=${keyword}&` : "";
    var sortByParam = sortBy !== "" ? `sortBy=${sortBy}&sortValue=${sortValue}&` : "";
    var url = `${this.REST_API_SERVICE}/products?${keywordParam}${sortByParam}categoryId=${categoryId}&page=${page}&limit=${limit}`;
    console.log(url);

    return this.http
      .get<CurrentPage>(url)
      .pipe(
        tap(_ => this.log('fetched products !')),
        catchError(this.handleError<CurrentPage>('get all products', null))
      );
  }

  // getAll(): Observable<Product[]> {
  //   return this.http
  //     .get<Product[]>(`${this.REST_API_SERVICE}/products/all`).pipe(
  //       tap(_ => this.log('Fetched all products!')),
  //       catchError(this.handleError<Product[]>('Get all products', []))
  //     );
  // }

  private log(message: string) {
    console.log('ProductService: ', message);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  constructor(private http: HttpClient) { }
}
