import { Component } from '@angular/core';
import { PeopleService } from '../services/people.service';
import { ActivatedRoute } from '@angular/router';
import { Person } from '../domain/person';
import { InterceptorService } from '../services/interceptor.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent {

  person: Person = {} as Person;
  role: string = "";

  constructor(private peopleService: PeopleService,
    private tokenService: InterceptorService,
    private route: ActivatedRoute) {
      let id = this.route.snapshot.params['id'];
      this.peopleService.getOnePerson(id).subscribe(res => {
        this.person = res;
      });
      this.role = this.tokenService.getRole();
  }
}
