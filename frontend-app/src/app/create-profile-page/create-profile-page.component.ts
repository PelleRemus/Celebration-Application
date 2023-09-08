import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Person } from '../domain/person';
import { PeopleService } from '../services/people.service';

@Component({
  selector: 'app-create-profile-page',
  templateUrl: './create-profile-page.component.html',
  styleUrls: ['./create-profile-page.component.scss']
})
export class CreateProfilePageComponent {

  addProfileForm: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder, private peopleService: PeopleService) {
    this.initializeForm();
  }

  initializeForm(): void {
    this.addProfileForm = this.formBuilder.group({
      firstName: [ "", [Validators.required] ],
      lastName: [ "", [Validators.required] ],
      userName: [ "", [Validators.required] ],
      email: [ "", [Validators.required, Validators.email] ],
      password: [ "", [Validators.required] ],
      confirmPassword: [ "", [Validators.required] ],
      birthDate: [ "", [Validators.required] ],
      daysBeforeNotice: [ "", [Validators.required, Validators.min(1)] ],
      isAdmin: [ "", [] ]
    });
  }

  onSubmit(): void {
    if (this.addProfileForm.valid) {
      const birthDateObj = this.addProfileForm.get("birthDate")?.value;
      const birthDate = new Date(`${birthDateObj.year}-${birthDateObj.month}-${birthDateObj.day}`);

      let person = {
        firstName: this.addProfileForm.get("firstName")?.value,
        lastName: this.addProfileForm.get("lastName")?.value,
        userName: this.addProfileForm.get("userName")?.value,
        email: this.addProfileForm.get("email")?.value,
        password: this.addProfileForm.get("password")?.value,
        birthDate: birthDate,
        daysBeforeNotice: +this.addProfileForm.get("daysBeforeNotice")?.value
      } as Person;

      this.peopleService.postPerson(person).subscribe(res => {});
    }
  }
}
