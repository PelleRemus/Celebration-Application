import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';
import { calendarEvent, clipboardFill, trashFill, pencilFill } from 'ngx-bootstrap-icons';
const icons = {
  calendarEvent,
  clipboardFill,
  trashFill,
  pencilFill
};

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { CreateProfilePageComponent } from './create-profile-page/create-profile-page.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { PeopleService } from './services/people.service';
import { LoginService } from './services/login.service';
import { InterceptorService } from './services/interceptor.service';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ToastsContainerComponent } from './toasts-container/toasts-container.component';
import { ToastService } from './services/toast.service';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomePageComponent,
    LoginPageComponent,
    ProfilePageComponent,
    CreateProfilePageComponent,
    NotFoundPageComponent,
    EditProfileComponent,
    ToastsContainerComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgxBootstrapIconsModule.pick(icons)
  ],
  providers: [
    PeopleService,
    ToastService,
    LoginService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
