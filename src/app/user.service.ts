import { Injectable } from '@angular/core';
import { User } from './user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl='http://localhost:56074/api/Users/';
  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl+"GetUsers")
    .pipe(
      catchError(this.handleError('getUsers', []))
    );
  }

  /** POST: add a new hero to the server */
addUser (user: User): Observable<User> {
  return this.http.post<User>(this.userUrl+"Add", user, httpOptions).pipe(
    catchError(this.handleError<User>('addUser'))
  );
}

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
   
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
   
      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);
   
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** GET hero by id. Will 404 if id not found */
getUser(id: number): Observable<User> {
  const url = `${this.userUrl+"GetUser"}/${id}`;
  return this.http.get<User>(url).pipe(
    catchError(this.handleError<User>(`getUser id=${id}`))
  );
}
}
