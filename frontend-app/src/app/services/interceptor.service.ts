import { HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, of, throwError } from 'rxjs';
import { Token } from '../domain/token';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {

    constructor(private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        var token: Token | null = this.getToken();
        request = token ? request.clone({
            headers: request.headers.set("Authorization", "Bearer " + token.value)
        }) : request;

        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    this.router.navigate(['/login']);
                    return of();
                }

                if (error.status === 403) {
                    this.router.navigate(['/forbidden']);
                    return of();
                }
                return throwError(() => error);
            })
        );
    }

    getToken(): Token | null {
        return this.validate(JSON.parse(localStorage.getItem("token") as string));
    }

    validate(token: Token | null): Token | null {
        if (token) {
            if (new Date(token.expiry) > new Date())
                return token;
        }
        return null;
    }

    getRole(): string {
        return this.getToken()?.userRole || "";
    }
}
