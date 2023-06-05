import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.prod";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  login(User: any) {
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, User)
      .pipe(
        tap((response: any) => this.setToken(response))
      );
  }

  private setToken(response: any) {
    if (response) {
      const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
      localStorage.setItem('fb-token-exp', expDate.toISOString());
      localStorage.setItem('fb-token', response.idToken);
    } else {
      localStorage.removeItem('fb-token-exp');
      localStorage.removeItem('fb-token');
    }
  }

  get token() {
    const expDateString = localStorage.getItem('fb-token-exp');
    const expDate = expDateString ? new Date(expDateString) : null;
    if (expDate && new Date() > expDate) {
      this.logout();
      return null;
    }
    return localStorage.getItem('fb-token');
  }

  logout() {
    this.setToken(null);
  }

  isAuthenticated() {
    return !!this.token;
  }
}
