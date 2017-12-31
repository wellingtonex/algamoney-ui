import { JwtHelper } from 'angular2-jwt';
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {

  oauthTokenUrl = 'http://localhost:8080/oauth/token';
  jwtPayLoad: any;

  constructor(
    private http: Http,
    private jwtHelper: JwtHelper
  ) {
    this.carregarToken();
   }

  login(usuario: string, senha: string): Promise<void> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    return this.http.post(this.oauthTokenUrl, body, { headers })
      .toPromise()
      .then(response => {
        console.log(response);
        this.armazenarToken(response.json().access_token);
      })
      .catch(response => {
        console.log(response);
        if (response.status === 400) {
          const reponseJson = response.json();
          if (reponseJson.error === 'invalid_grant') {
            return Promise.reject('Usuário ou senha inválido!');
          }
        }
        return Promise.reject(response);
      });
  }

  private armazenarToken(token: string) {
    this.jwtPayLoad = this.jwtHelper.decodeToken(token);
    localStorage.setItem('token', token);
  }

  private carregarToken() {
    const token = localStorage.getItem('token');
    if (token) {
      this.armazenarToken(token);
    }
  }
}
