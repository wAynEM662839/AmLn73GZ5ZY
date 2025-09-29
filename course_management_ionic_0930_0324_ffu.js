// 代码生成时间: 2025-09-30 03:24:24
// Import necessary modules
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CourseManagementService {
  // URL for the course content API
  private apiUrl = 'https://api.yourdomain.com/courses';

  constructor(private http: HttpClient) {}

  // Function to get all courses
  getCourses(): Observable<any> {
    return this.http.get(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  // Function to add a new course
  addCourse(course: any): Observable<any> {
    return this.http.post(this.apiUrl, course).pipe(
      catchError(this.handleError)
    );
  }

  // Function to update an existing course
  updateCourse(courseId: string, course: any): Observable<any> {
    const url = `${this.apiUrl}/${courseId}`;
    return this.http.put(url, course).pipe(
      catchError(this.handleError)
    );
  }

  // Function to delete a course
  deleteCourse(courseId: string): Observable<any> {
    const url = `${this.apiUrl}/${courseId}`;
    return this.http.delete(url).pipe(
      catchError(this.handleError)
    );
  }

  // Handle HTTP errors
  private handleError(error: any) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`
      );
    }
    // Return an user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
}
