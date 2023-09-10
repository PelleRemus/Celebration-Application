import { Component } from '@angular/core';
import { PeopleService } from '../services/people.service';
import { ActivatedRoute } from '@angular/router';
import { Person } from '../domain/person';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent {

  person: Person = {} as Person;

  constructor(private peopleService: PeopleService, private route: ActivatedRoute,)
  {
    let id = this.route.snapshot.params['id'];
    peopleService.getOnePerson(id).subscribe(res => {
      this.person = res;
    })
  }
}
