import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Person } from '../domain/person';
import { confirmPasswordValidator } from '../domain/confirm-password-validator'
import { PeopleService } from '../services/people.service';
import { InterceptorService } from '../services/interceptor.service';
import { passwordValidator } from '../domain/password-validator';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-create-profile-page',
  templateUrl: './create-profile-page.component.html',
  styleUrls: ['./create-profile-page.component.scss']
})
export class CreateProfilePageComponent {

  addProfileForm: FormGroup = new FormGroup({});
  submitted: boolean = false;

  constructor(private peopleService: PeopleService,
    private tokenService: InterceptorService,
    private toastService: ToastService,
    private router: Router) {
      if(this.tokenService.getRole() != "Admin") {
        this.router.navigate(['/forbidden'])
      }
      this.initializeForm();
  }

  initializeForm(): void {
    this.addProfileForm = new FormGroup({
      firstName: new FormControl<string>("", [Validators.required]),
      lastName: new FormControl<string>("", [Validators.required]),
      userName: new FormControl<string>("", [Validators.required]),
      email: new FormControl<string>("", [Validators.required, Validators.email]),
      password: new FormControl<string>("", [Validators.required,Validators.minLength(8),passwordValidator]),
      confirmPassword: new FormControl<string>("", [Validators.required]),
      birthDate: new FormControl<Date|null>(null, [Validators.required]),
      daysBeforeNotice: new FormControl<number|null>(null, [Validators.required, Validators.min(2)]),
      isAdmin: new FormControl<boolean|null>(null, [])
    }, confirmPasswordValidator);
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.addProfileForm.valid) {
      const birthDateObj = this.addProfileForm.get("birthDate")?.value;
      const birthDate = new Date(`${birthDateObj.year}-${birthDateObj.month}-${birthDateObj.day}`);
      birthDate.setHours(8);

      const person = {
        firstName: this.addProfileForm.get("firstName")?.value,
        lastName: this.addProfileForm.get("lastName")?.value,
        userName: this.addProfileForm.get("userName")?.value,
        email: this.addProfileForm.get("email")?.value,
        password: this.addProfileForm.get("password")?.value,
        birthDate: birthDate,
        daysBeforeNotice: +this.addProfileForm.get("daysBeforeNotice")?.value,
        isAdmin: this.addProfileForm.get("isAdmin")?.value == true
      } as Person;

      this.peopleService.postPerson(person).subscribe(res => {
        this.toastService.showSuccess(`Successfully added person ${res.firstName} ${res.lastName}`);
        this.router.navigate(['/']);
      });
    }
  }
}
