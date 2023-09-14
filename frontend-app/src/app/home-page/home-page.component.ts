import { Component, ViewChild } from '@angular/core';
import { PeopleService } from '../services/people.service';
import { PersonOverview } from '../domain/person-overview';
import { InterceptorService } from '../services/interceptor.service';
import { ToastService } from '../services/toast.service';
import { ModalComponent } from '../modal/modal.component';
import { ModalConfig } from '../domain/modal-config';
import { PeoplePage } from '../domain/people-page';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {

  @ViewChild('modal') private modalComponent: ModalComponent | undefined;
  modalConfig: ModalConfig = {
    modalTitle: 'Delete person?',
    dismissButtonLabel: 'Cancel',
    closeButtonLabel: 'Confirm',
    onDismiss: () => false,
    onClose: () => true,
  } as ModalConfig;

  peoplePage: PeoplePage = { page: 1 } as PeoplePage;
  toDelete: PersonOverview | undefined;
  role: string = "";

  constructor(private peopleService: PeopleService,
    private tokenService: InterceptorService,
    private toastService: ToastService) {
      this.getPeople();
      this.role = this.tokenService.getRole();
  }

  getPeople() {
    this.peopleService.getPeoplePaginated(this.peoplePage.page).subscribe(res => {
      this.peoplePage = res;
    });
  }

  async deletePerson(id: number) {
    this.toDelete = this.peoplePage.peopleList.find(p => p.id == id);
    if(await this.openModal()) {
      this.peopleService.deletePerson(id).subscribe(res => {
        this.getPeople();
        this.toastService.showSuccess(`Successfully deleted person ${res.firstName} ${res.lastName}`);
      })
    }
  }

  async openModal() {
    return await this.modalComponent?.open()
  }
}
