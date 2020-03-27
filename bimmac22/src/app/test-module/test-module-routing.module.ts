import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BimserviceService } from '../bimservice.service';

import { AppComponent } from '../app.component';
import { LoginComponent } from '../login/login.component';
import { ElementsComponent } from '../elements/elements.component';

const routes: Routes = [

  { path: 'elements', component: ElementsComponent },
  { path: 'elements/:id', component: ElementsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestModuleRoutingModule { }
