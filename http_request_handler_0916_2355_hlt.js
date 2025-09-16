// 代码生成时间: 2025-09-16 23:55:08
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from '../environments/environment'; // Import environment variables

@Injectable({
  providedIn: 'root'
})
export class HttpRequestHandler {
  // Base URL of the API
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  /**
   * Send a GET request to the specified endpoint
   * @param endpoint The endpoint URL
   */
  get<T>(endpoint: string) {
    return this.http.get<T>(`${this.apiUrl}/${endpoint}`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Send a POST request to the specified endpoint
   * @param endpoint The endpoint URL
   * @param body The body of the request
   */
  post<T>(endpoint: string, body: any) {
    return this.http.post<T>(`${this.apiUrl}/${endpoint}`, body).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Send a PUT request to the specified endpoint
   * @param endpoint The endpoint URL
   * @param body The body of the request
   */
  put<T>(endpoint: string, body: any) {
    return this.http.put<T>(`${this.apiUrl}/${endpoint}`, body).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Send a DELETE request to the specified endpoint
   * @param endpoint The endpoint URL
   */
  delete<T>(endpoint: string) {
    return this.http.delete<T>(`${this.apiUrl}/${endpoint}`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Handle HTTP errors
   * @param error The error to handle
   */
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      // so log it with the error code.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.'
    );
  }
}
