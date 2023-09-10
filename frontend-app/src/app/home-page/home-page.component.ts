import { Component } from '@angular/core';
import { PeopleService } from '../services/people.service';
import { PersonOverview } from '../domain/person-overview';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {

  peopleList: PersonOverview[] = [];

  constructor(private peopleService: PeopleService) {
    this.getPeople();
  }

  getPeople() {
    this.peopleService.getAllPeople().subscribe(res => {
      this.peopleList = res;
    });
  }
}
