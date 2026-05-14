import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, EMPTY, catchError, switchMap, tap } from 'rxjs';
import { Formulario } from '../formulario/formulario.component';
import { LoginService, Token, User } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class SendCorreosService {
  private readonly http = inject(HttpClient);
  private readonly login = inject(LoginService);
  private readonly url = 'https://intranet.kostazul.com/api/correos/';
  private token?: Token;

  sendcorreos(formulario: Formulario): Observable<Formulario> {
    return this.validarLogin().pipe(
      switchMap((token) => {
        if (!token) return EMPTY;
        const headers = new HttpHeaders({ Authorization: `Bearer ${token.access}` });
        return this.http.post<Formulario>(this.url, formulario, { headers }).pipe(
          catchError((err) => {
            console.error('Error al enviar correo:', err);
            return EMPTY;
          })
        );
      })
    );
  }

  validarLogin(): Observable<Token> {
    const usuario: User = {
      username: '4200',
      password: 'Kosta123*',
    };
    return this.login.login(usuario).pipe(
      tap((token) => (this.token = token)),
      catchError((err) => {
        console.error('Error al validar login:', err);
        return EMPTY;
      })
    );
  }
}


