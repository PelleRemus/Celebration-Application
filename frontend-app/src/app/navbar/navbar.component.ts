import { Component, OnDestroy, ViewChild } from '@angular/core';
import { InterceptorService } from '../services/interceptor.service';
import { ModalComponent } from '../modal/modal.component';
import { ModalConfig } from '../domain/modal-config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnDestroy {

  @ViewChild('modal') private modalComponent: ModalComponent | undefined;
  modalConfig: ModalConfig = {
    modalTitle: 'Logout?',
    dismissButtonLabel: 'Cancel',
    closeButtonLabel: 'Confirm',
    onDismiss: () => false,
    onClose: () => true,
  } as ModalConfig;

  role: string = "";
  interval: any;

  constructor(private tokenService: InterceptorService, private router: Router) {
    this.role = tokenService.getRole();
    this.interval = setInterval(() => this.role = this.tokenService.getRole(), 1000);
  }

  async logout() {
    if(await this.openModal()) {
      this.router.navigate(['login']);
    }
  }

  async openModal() {
    return await this.modalComponent?.open()
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
}
