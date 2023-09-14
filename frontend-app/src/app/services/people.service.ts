import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Person } from '../domain/person';
import { Observable } from 'rxjs';
import { PersonOverview } from '../domain/person-overview';
import { PeoplePage } from '../domain/people-page';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  
  baseUrl: string = "https://localhost:7007";
  endpoint: string = "/api/People"

  constructor(private client: HttpClient) { }
  
  getPeoplePaginated(page: number): Observable<PeoplePage> {
    return this.client.get<PeoplePage>(`${this.baseUrl}${this.endpoint}/page/${page}`);
  }

  getOnePerson(id: number): Observable<Person> {
    return this.client.get<Person>(`${this.baseUrl}${this.endpoint}/${id}`);
  }

  postPerson(person: Person): Observable<Person> {
    return this.client.post<Person>(`${this.baseUrl}${this.endpoint}`, person);
  }

  editPerson(id: number, person: Person): Observable<any> {
    return this.client.put<Person>(`${this.baseUrl}${this.endpoint}/${id}`, person);
  }

  deletePerson(id: number): Observable<Person> {
    return this.client.delete<Person>(`${this.baseUrl}${this.endpoint}/${id}`);
  }
}
