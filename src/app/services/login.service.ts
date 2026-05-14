import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

export interface Token {
  refresh: string;
  access: string;
}

export interface User {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly http = inject(HttpClient);
  private readonly url = 'https://intranet.kostazul.com/api/auth/login/';

  login(formulario: User): Observable<Token> {
    return this.http.post<Token>(this.url, formulario);
  }
}

