import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { InterceptorService } from '../services/interceptor.service';
import { ModalComponent } from '../modal/modal.component';
import { ModalConfig } from '../domain/modal-config';
import { Router } from '@angular/router';
import { TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import { TranslocoHttpLoader } from '../services/transloco-loader';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  @ViewChild('modal') private modalComponent: ModalComponent | undefined;
  modalConfig: ModalConfig = {} as ModalConfig;

  role: string = "";
  interval: any;

  constructor(private tokenService: InterceptorService,
    private translocoHttpLoader: TranslocoHttpLoader,
    public translocoService: TranslocoService,
    private router: Router) {
      this.role = tokenService.getRole();
      this.interval = setInterval(() => this.role = this.tokenService.getRole(), 1000);
  }

  ngOnInit(): void {
    this.translocoHttpLoader.getTranslation(this.translocoService.getActiveLang())
      .subscribe(translation => {
        this.modalConfig = {
          modalTitle: translation['modal']['logout-title'],
          dismissButtonLabel: translation['modal']['cancel-button'],
          closeButtonLabel: translation['modal']['confirm-button'],
          onDismiss: () => false,
          onClose: () => true,
        } as ModalConfig;
      });
  }

  async logout() {
    if(await this.openModal()) {
      this.router.navigate(['login']);
    }
  }

  async openModal() {
    return await this.modalComponent?.open()
  }

  changeLanguage(language: string) {
    this.translocoService.setActiveLang(language);
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
}
