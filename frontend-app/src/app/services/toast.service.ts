import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  toasts: any[] = [];

	showSuccess(message: string) {
		this.show(message, { classname: 'bg-success text-light', delay: 10000 });
	}
	showDanger(message: string) {
		this.show(message, { classname: 'bg-danger text-light', delay: 15000 });
	}
  private show(message: string, options: any = {}) {
		this.toasts.push({ message, ...options });
	}

  remove(toast: any) {
		this.toasts = this.toasts.filter((t) => t !== toast);
	}
	clear() {
		this.toasts.splice(0, this.toasts.length);
	}
}
