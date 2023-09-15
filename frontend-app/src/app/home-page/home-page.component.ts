import { Component, OnInit, ViewChild } from '@angular/core';
import { PeopleService } from '../services/people.service';
import { PersonOverview } from '../domain/person-overview';
import { InterceptorService } from '../services/interceptor.service';
import { ToastService } from '../services/toast.service';
import { ModalComponent } from '../modal/modal.component';
import { ModalConfig } from '../domain/modal-config';
import { PeoplePage } from '../domain/people-page';
import { TranslocoHttpLoader } from '../services/transloco-loader';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  @ViewChild('modal') private modalComponent: ModalComponent | undefined;
  modalConfig: ModalConfig = {} as ModalConfig;

  peoplePage: PeoplePage = { page: 1 } as PeoplePage;
  toDelete: PersonOverview | undefined;
  role: string = "";

  constructor(private peopleService: PeopleService,
    private translocoHttpLoader: TranslocoHttpLoader,
    private translocoService: TranslocoService,
    private tokenService: InterceptorService,
    private toastService: ToastService) {
      this.getPeople();
      this.role = this.tokenService.getRole();
  }

  ngOnInit(): void {
    this.translocoHttpLoader.getTranslation(this.translocoService.getActiveLang())
      .subscribe(translation => {
        this.modalConfig = {
          modalTitle: translation['modal']['delete-title'],
          dismissButtonLabel: translation['modal']['cancel-button'],
          closeButtonLabel: translation['modal']['confirm-button'],
          onDismiss: () => false,
          onClose: () => true,
        } as ModalConfig;
      });
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
