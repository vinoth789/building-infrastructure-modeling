import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { BimserviceService} from './bimservice.service';


export class User {
  constructor(
    public userid: string,
    public password: string) { }
}

@Injectable()
export class AuthenticationService implements CanActivate {

  valididation: boolean;
  errorMessage: string;
  
  
  constructor(private _bimService: BimserviceService,private _router: Router) { }
  canActivate() {
    //return this.loginService.isLoggedIn();
    if(localStorage.getItem('user') != null){
      return true;
    }else{
      window.alert("Please login");
      this._router.navigate(['login']);      
      return false;
      
    }
  }
  logout() {
    localStorage.removeItem("user");
    this._router.navigate(['login']);
    return true;
  }

  login(user){
    // call the bimservice to check for user authentication
    // the calling service returns true or false based on the authentication
    //should pass the resSiteError

    console.log('in login of auth service');
    console.log(this.valididation);   
    this._bimService.getUserValidity(user)
    .subscribe(resSiteData =>{ if( resSiteData){
      localStorage.setItem("user", user.userid);   
      console.log('redirecting to home');
      //If valid then navigate to the private home components
      this._router.navigate(['/home']);
      return true
    }else{
      window.alert('Invalid Credentials');
      return false;
    } },
    resSiteError => this.errorMessage = resSiteError)
    
  }

  checkCredentials(){
    //Check if the user has logged in if not then route to Login comp
    if (localStorage.getItem("user") == null){
      console.log('user not logged in so redirecting to login page from service')      
        this._router.navigate(['/login']);
        
    }else{
      console.log(localStorage.getItem("user"));
    }
  }

}
