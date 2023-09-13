import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Person } from '../domain/person';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PeopleService } from '../services/people.service';
import { InterceptorService } from '../services/interceptor.service';
import { Router } from '@angular/router';
import { passwordValidator } from '../domain/password-validator';
import { confirmPasswordValidator } from '../domain/confirm-password-validator';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  @Input() inputPerson: Person = {} as Person;
  @Output() cancelEvent = new EventEmitter<boolean>();
  editProfileForm: FormGroup = new FormGroup({});
  submitted: boolean = false;

  constructor(private peopleService: PeopleService,
    private tokenService: InterceptorService,
    private router: Router) {
      if(tokenService.getRole() != 'Admin') {
        router.navigate(['/forbidden'])
      }
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    const dateString = JSON.parse(JSON.stringify(this.inputPerson.birthDate));
    const date = {
      day: +dateString.split('-')[2].split('T')[0],
      month: +dateString.split('-')[1],
      year: +dateString.split('-')[0]
    };

    this.editProfileForm = new FormGroup({
      firstName: new FormControl<string>(this.inputPerson.firstName, [Validators.required]),
      lastName: new FormControl<string>(this.inputPerson.lastName, [Validators.required]),
      userName: new FormControl<string>(this.inputPerson.userName, [Validators.required]),
      email: new FormControl<string>(this.inputPerson.email, [Validators.required, Validators.email]),
      shouldChangePassword: new FormControl<boolean>(false, []),
      birthDate: new FormControl(date, [Validators.required]),
      daysBeforeNotice: new FormControl<number>(this.inputPerson.daysBeforeNotice, [Validators.required, Validators.min(2)]),
      isAdmin: new FormControl<boolean>(this.inputPerson.isAdmin, [])
    });
  }

  togglePassword(): void {
    if (this.editProfileForm.get('shouldChangePassword')?.value) {
      this.editProfileForm.addControl('password',
        new FormControl<string>('', [Validators.required, Validators.minLength(8), passwordValidator]));
      this.editProfileForm.addControl('confirmPassword', new FormControl<string>('', [Validators.required]));
      this.editProfileForm.addValidators(confirmPasswordValidator);
    } else {
      this.editProfileForm.removeControl('password');
      this.editProfileForm.removeControl('confirmPassword');
      this.editProfileForm.removeValidators(confirmPasswordValidator);
    }
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.editProfileForm.valid) {
      const birthDateObj = this.editProfileForm.get('birthDate')?.value;
      const birthDate = new Date(`${birthDateObj.year}-${birthDateObj.month}-${birthDateObj.day}`);
      
      let person = {
        firstName: this.editProfileForm.get('firstName')?.value,
        lastName: this.editProfileForm.get('lastName')?.value,
        userName: this.editProfileForm.get('userName')?.value,
        email: this.editProfileForm.get('email')?.value,
        password: this.editProfileForm.get('password')?.value,
        birthDate: birthDate,
        daysBeforeNotice: +this.editProfileForm.get('daysBeforeNotice')?.value,
        isAdmin: this.editProfileForm.get('isAdmin')?.value == true
      } as Person;

      this.peopleService.editPerson(this.inputPerson.id, person).subscribe(res => {
        window.location.reload()
      });
    }
  }
}
