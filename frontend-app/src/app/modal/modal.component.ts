import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalConfig } from '../domain/modal-config';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  
  @Input() modalConfig: ModalConfig = {} as ModalConfig;
  @ViewChild('modal') modalContent: TemplateRef<ModalComponent> | undefined;
  modalRef: NgbModalRef = {} as NgbModalRef;

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void { }

  open() {
    return new Promise<boolean>(resolve => {
      this.modalRef = this.modalService.open(this.modalContent);
      this.modalRef.result.then(resolve, (reason) => {
        if (reason === ModalDismissReasons.ESC) {
          return false;
        }
        return resolve;
      });
    })
  }

  async close() {
    if (this.modalConfig.shouldClose === undefined || (await this.modalConfig.shouldClose())) {
      const result = this.modalConfig.onClose === undefined || (await this.modalConfig.onClose())
      this.modalRef.close(result)
    }
  }

  async dismiss() {
    if (this.modalConfig.shouldDismiss === undefined || (await this.modalConfig.shouldDismiss())) {
      const result = this.modalConfig.onDismiss === undefined || (await this.modalConfig.onDismiss())
      this.modalRef.dismiss(result)
    }
  }
}
