import { Component, OnDestroy } from '@angular/core';
import { InterceptorService } from '../services/interceptor.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnDestroy {

  role: string = "";
  interval: any;

  constructor(private tokenService: InterceptorService)
  {
    this.role = tokenService.getRole();
    this.interval = setInterval(() => this.role = tokenService.getRole(), 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
}
