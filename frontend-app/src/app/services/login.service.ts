import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserLogin } from '../domain/user-login';
import { Observable } from 'rxjs';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  baseUrl: string = "https://localhost:7007";
  endpoint: string = "/api/Login"

  constructor(private client: HttpClient) { }

  login(userLogin: UserLogin): Observable<Token> {
    return this.client.post<Token>(`${this.baseUrl}${this.endpoint}`, userLogin);
  }

  logout() {
    localStorage.removeItem("token");
  }
}
