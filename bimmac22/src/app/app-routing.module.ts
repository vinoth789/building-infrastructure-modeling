import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthenticatedComponent} from './authenticated/authenticated.component';
import { LoginComponent } from './login/login.component';
import { SitesComponent } from './sites/sites.component';
import { ElementsComponent } from './elements/elements.component';
import { AboutComponent } from "./about/about.component";
import { ContactComponent } from "./contact/contact.component";
import { AuthenticationService} from './authentication.service';

export const router: Routes = [
    
    { path: '', component: LoginComponent }, 
    { path: 'list', component: SitesComponent },
    { path: 'details', component: SitesComponent },
    { path: 'details/:id', component: SitesComponent },
    { path: 'elements', component: ElementsComponent },
    { path: 'elements/:id', component: ElementsComponent },
    { path: 'about', component: AboutComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'sites/:id', component: SitesComponent },

     //New routing v3.0 with auth guard
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'home',  component: AuthenticatedComponent , canActivate: [AuthenticationService],

    children:[
    //{ path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'about', component: AboutComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'elements/:id', component: ElementsComponent },    
    { path: 'details/:id', component: SitesComponent },
  ]},

];


@NgModule({
    imports: [RouterModule.forRoot(router)],
    exports: [RouterModule]
  })
  export class AppModuleRoutingModule { }

//export const routes: ModuleWithProviders = RouterModule.forRoot(router);
