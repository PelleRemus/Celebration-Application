import { HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, of, throwError } from 'rxjs';
import { Token } from '../domain/token';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {

    constructor(private toastService: ToastService, private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        var token: Token | null = this.getToken();
        request = token ? request.clone({
            headers: request.headers.set("Authorization", "Bearer " + token.value)
        }) : request;

        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                if(error.status == 400) {
                    this.toastService.showDanger(error.error);
                    return of();
                }

                if (error.status === 401) {
                    this.toastService.showDanger("You need to be logged in to continue");
                    this.router.navigate(['/login']);
                    return of();
                }

                if (error.status === 403) {
                    this.toastService.showDanger("You are not allowed to make that action");
                    this.router.navigate(['/home']);
                    return of();
                }

                if(error.status == 404) {
                    this.toastService.showDanger(error.error);
                    this.router.navigate(['/home']);
                    return of();
                }
                return throwError(() => error);
            })
        );
    }

    getToken(): Token | null {
        const token = JSON.parse(localStorage.getItem("token") as string)
        if(token) {
            return this.validate(token);
        }
        return null;
    }

    validate(token: Token): Token | null {
        if (new Date(token.expiry) > new Date())
            return token;
        this.toastService.showDanger("Your authentication token has expired!")
        localStorage.removeItem("token");
        return null;
    }

    getRole(): string {
        return this.getToken()?.userRole || "";
    }
}
