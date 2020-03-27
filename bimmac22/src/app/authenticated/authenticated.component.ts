import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../authentication.service';

@Component({
  selector: 'app-authenticated',
  providers: [AuthenticationService],  
  templateUrl: './authenticated.component.html',
  styleUrls: ['./authenticated.component.css']
})
export class AuthenticatedComponent implements OnInit {

  constructor( private _authenticationservice: AuthenticationService) { }

  ngOnInit() {
    this._authenticationservice.checkCredentials();
  }
  

}
