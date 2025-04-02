import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Formulario } from '../formulario/formulario.component';
import { LoginService, Token, User } from './login.service';
import { Observable, catchError, of, switchMap, tap, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SendCorreosService {
  private http = inject(HttpClient)
  private url = "https://intranet.kostazul.com/api/correos/"
  private login = inject(LoginService)
  private token? : Token 

  sendcorreos(formulario: Formulario): Observable<Formulario> {
    return this.validarLogin().pipe(
      switchMap((token) => {
        if (token) {
          const headers = new HttpHeaders({ 'Authorization': `Bearer ${token.access}` });
          return this.http.post<Formulario>(this.url, formulario, { headers }).pipe(
            catchError(err => {
              console.log(err);
              return of();
            })
          );
        } else {
          console.log("disosito");
          return of();
        }
      })
    );
  }

  validarLogin(): Observable<Token> {
    const usuario: User = {
      username: "4200",
      password: "Kosta123*"
    };
    return this.login.login(usuario).pipe(
      tap(token => this.token = token),
      catchError(err => {
        console.log(err);
        return of()})
    );
  }

}

