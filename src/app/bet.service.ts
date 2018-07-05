import { Injectable } from '@angular/core';
import { Bet } from './bet';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class BetService {
  private betURL='http://localhost:56074/api/Bets/';
  constructor(private http:HttpClient) { }

  getbets(): Observable<Bet[]> {
    return this.http.get<Bet[]>(this.betURL+"GetBets").pipe(
      catchError(this.handleError('getUsers', []))
    );
  }
  placeBets(bet: Bet): Observable<Bet>{
    return this.http.post<Bet>(this.betURL+"Add",bet,httpOptions).pipe(
      catchError(this.handleError<Bet>('addBet'))
    )
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
}
