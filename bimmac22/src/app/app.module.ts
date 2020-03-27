import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule} from '@angular/router';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdButtonModule, MdCheckboxModule, MdDialogModule, MdOptionModule, MaterialModule} from '@angular/material';
import { PopupComponent } from './popup/popup.component';
import { AppModuleRoutingModule} from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SitesComponent } from './sites/sites.component';
import { ElementsComponent } from './elements/elements.component';
import { BimserviceService } from './bimservice.service';
import { AuthenticationService } from './authentication.service';
import { QrScannerModule } from 'angular2-qrscanner';
import { QrscannerbimComponent } from './qrscannerbim/qrscannerbim.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { AuthenticatedComponent } from './authenticated/authenticated.component';
import { HomeComponent } from './home/home.component';





@NgModule({
  declarations: [
    AppComponent,
    PopupComponent,
    LoginComponent,
    SitesComponent,
    ElementsComponent,
    QrscannerbimComponent,
    AboutComponent,
    ContactComponent,
    AuthenticatedComponent,
    HomeComponent,
  ],
  imports: [
      BrowserModule,
      BrowserAnimationsModule,
      MdButtonModule, MdCheckboxModule, MdDialogModule,MdOptionModule,MaterialModule,
      RouterModule,
      FormsModule,
      HttpModule,
      HttpClientModule,
      AppModuleRoutingModule,
      QrScannerModule
      
  ],
  entryComponents: [PopupComponent,QrscannerbimComponent
  ],
  providers: [BimserviceService, AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
