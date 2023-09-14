import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { UserLogin } from '../domain/user-login';
import { Router } from '@angular/router';
import { InterceptorService } from '../services/interceptor.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  loginForm: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder,
    private tokenService: InterceptorService,
    private loginService: LoginService,
    private toastService: ToastService,
    private router: Router) {
      if(this.tokenService.getToken()) {
        this.loginService.logout();
        this.toastService.showSuccess("Successfully logged out!");
      }
      this.initializeForm();
  }

  initializeForm(): void {
    this.loginForm = this.formBuilder.group({
      userName: [ "", [Validators.required] ],
      password: [ "", [Validators.required] ]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      let userLogin = {
        userName: this.loginForm.get("userName")?.value,
        password: this.loginForm.get("password")?.value,
      } as UserLogin;

      this.loginService.login(userLogin).subscribe(token => {
        localStorage.setItem("token", JSON.stringify(token));
        this.toastService.showSuccess("Successfully logged in!");
        this.router.navigate(['/']);
      });
    }
  }
}
