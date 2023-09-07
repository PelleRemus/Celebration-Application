import { Component } from '@angular/core';
import { Person } from '../domain/person';
import { PeopleService } from '../services/people.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {

  peopleList: Person[] = [];

  constructor(private peopleService: PeopleService) {
    this.getPeople();
  }

  getPeople() {
    this.peopleService.getAllPeople().subscribe(res => {
      this.peopleList = res;
    });
  }
}
