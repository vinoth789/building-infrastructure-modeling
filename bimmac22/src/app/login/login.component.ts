import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BimserviceService} from '../bimservice.service';
import { AuthenticationService, User} from '../authentication.service'

@Component({
  selector: 'app-login',
  providers: [AuthenticationService],  
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit{
  myModel = [];  
  sites = [];
  //validid: boolean;
  errorMessage: string;
  validid = false;
  public errorMsg = '';
  public fullPath:string;
  public pic = 'BIM.png';
  
  constructor(private _service:AuthenticationService, private _bimService: BimserviceService, private router: Router) { }

  ngOnInit(){
    this._service.checkCredentials();
    this.fullPath = "../../assets/"+this.pic;
  }


  onSubmit(user) {
    var userauth = {
      userid: user.userid,
      password: user.password,
    };

  if(!this._service.login(userauth)){
    console.log('failed to login');
    this.errorMsg = 'Failed to login';
  }
}
}



    

