import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MdDialog, MdDialogRef } from '@angular/material'

import { AboutComponent } from '../about/about.component';
import { ContactComponent } from '../contact/contact.component';
import { AuthenticationService} from '../authentication.service';

import { ActivatedRoute, Router, Params } from '@angular/router';

import { Http, Response, URLSearchParams, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  validid: string;
  sites : string[];
  title = 'BIM';
  apiValues: string[] = [];
  aboutDialog: MdDialogRef<AboutComponent>;
  contactDialog: MdDialogRef<ContactComponent>;
  name: 'Brad';
  constructor(private _httpService: HttpClient, public dialog : MdDialog, private _authservice: AuthenticationService) { 
   }
  ngOnInit() {
    console.log('in home component');
  }

  onSelect(comp) {
    this.openDialog(comp);
    
  }

  onLogout(){
    if(this._authservice.logout())
    window.alert('Logged out');
  }
  openDialog(comp){
    console.log(comp);
     if(comp == 'AboutComponent'){
     this.aboutDialog = this.dialog.open(AboutComponent);
     }else {
     this.contactDialog = this.dialog.open(ContactComponent); 
     }
 
 }
}
