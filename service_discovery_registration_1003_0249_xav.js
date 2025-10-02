// 代码生成时间: 2025-10-03 02:49:22
// Import necessary Ionic/Angular modules
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServiceDiscoveryRegistrationService {
  // Define the base URL for service registration and discovery
  private baseUrl = 'http://localhost:3000/services';

  constructor(private http: HttpClient) {}

  /**
   * Register a new service
   *
   * @param {Object} serviceDetails - Details of the service to be registered
   * @returns {Observable<Object>} - An observable that emits the registered service details
   */
  registerService(serviceDetails: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/register`, serviceDetails)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // handle any errors that occur during the request
      );
  }

  /**
   * Discover services
   *
   * @returns {Observable<Object[]>} - An observable that emits an array of discovered service details
   */
  discoverServices(): Observable<Object[]> {
    return this.http.get(`${this.baseUrl}/discover`)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  /**
   * Handle HTTP errors
   *
   * @param {any} error - The error caught by the catchError operator
   * @returns {Observable<never>} - An observable that emits an error to be handled by the subscriber
   */
  private handleError(error: any): Observable<never> {
    if (error.status === 0 || error.status === 404) {
      // Handle specific errors or rethrow to be handled by global error handling
      return throwError(new Error('Service unavailable or endpoint not found'));
    } else {
      return throwError(error);
    }
  }
}
