import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Pokemon } from './pokemon';
import {Ability} from './ability';
import {Move} from './move';

const apiUrl = 'https://pokeapi.co/api/v2/';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {
  constructor(private http: HttpClient) { }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  getMultiplePokemon(): Observable<Pokemon> {
    return this.http.get<Pokemon>(apiUrl + 'pokemon/?offset=0&limit=964')
      .pipe(
          catchError(this.handleError('getPokemons', null))
      );
  }

  getPokemon(id: any): Observable<Pokemon> {
    let url;
    if (id.split('/')[6] !== undefined) {
      id = id.split('/')[6];
    }
    url = `${apiUrl}pokemon/${id}`;
    return this.http.get<Pokemon>(url).pipe(
      catchError(this.handleError<Pokemon>(`getPokemon id=${id}`))
    );
  }
  getAbility(id: any): Observable<Ability> {
    let url;
    url = `${apiUrl}ability/${id}`;
    return this.http.get<Ability>(url).pipe(
      catchError(this.handleError<Ability>(`getAbility id=${id}`))
    );
  }
  getMove(id: any): Observable<Move> {
    let url;
    if (id.split('/')[6] !== undefined) {
      id = id.split('/')[6];
    }
    url = `${apiUrl}move/${id}`;
    return this.http.get<Move>(url).pipe(
      catchError(this.handleError<Move>(`getAbility id=${id}`))
    );
    return null;
  }
  getSpecies(id: any) {
    let url;
    if (id.split('/')[6] !== undefined) {
      id = id.split('/')[6];
    }
    url = `${apiUrl}pokemon-species/${id}`;
    return this.http.get<any>(url).pipe(
      catchError(this.handleError<any>(`getSpecies id=${id}`))
    );
    return null;
  }
  getEvoChain(id: any) {
    let url;
    if (id.split('/')[6] !== undefined) {
      id = id.split('/')[6];
    }
    url = `${apiUrl}evolution-chain/${id}`;
    return this.http.get<any>(url).pipe(
      catchError(this.handleError<any>(`getEvoChain id=${id}`))
    );
    return null;
  }

  getType(id: any) {
    let url;
    if (id.split('/')[6] !== undefined) {
      id = id.split('/')[6];
    }
    url = `${apiUrl}type/${id}`;
    return this.http.get<any>(url).pipe(
      catchError(this.handleError<any>(`getType id=${id}`))
    );
    return null;
  }
}
