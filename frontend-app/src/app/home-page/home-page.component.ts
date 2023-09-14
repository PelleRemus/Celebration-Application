import { Component } from '@angular/core';
import { PeopleService } from '../services/people.service';
import { PersonOverview } from '../domain/person-overview';
import { InterceptorService } from '../services/interceptor.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {

  peopleList: PersonOverview[] = [];
  role: string = "";

  constructor(private peopleService: PeopleService,
    private tokenService: InterceptorService,
    private toastService: ToastService) {
      this.getPeople();
      this.role = this.tokenService.getRole();
  }

  getPeople() {
    this.peopleService.getAllPeople().subscribe(res => {
      this.peopleList = res;
    });
  }

  deletePerson(id: number) {
    this.peopleService.deletePerson(id).subscribe(res => {
      this.peopleList = this.peopleList.filter(p => p.id != id);
      this.toastService.showSuccess(`Successfully deleted person ${res.firstName} ${res.lastName}`);
    })
  }
}
