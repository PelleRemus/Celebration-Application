import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { UserLogin } from '../domain/user-login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  loginForm: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private router: Router) {
    this.loginService.logout();
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
        this.router.navigate(['/']);
      });
    }
  }
}
