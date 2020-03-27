import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions, Headers  } from '@angular/http';
import {HttpClient, HttpClientModule} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';  
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Injectable()
export class BimserviceService {

  private _urluservalidity: string = "/api/Values/ValidateUser"
  private _urlgetsites: string = "/api/Values/GetSites"
  private _urlgetelements: string = "/api/Values/GetElements"
  private _urlgetelement: string = "/api/Values/GetElement"
  private _urlsetstatus: string = "api/Values/SetElementStatus"  

  constructor(private _http: HttpClient) { }
  
    //To validate the user
    getUserValidity(user: any) {
      
      //options not used in httpclient calls
      /*
      let headers = new Headers({
        'Content-Type':
        'application/json; charset=utf-8'
    });
    let options = new RequestOptions({ headers: headers });

    */
    console.log(user);
      return this._http.post(this._urluservalidity, user)
     // .map((response: Response) => response.json())
      .catch(this._errorHandler); // to handle the http error


  }

  //TOD

  //To get the user name and role in case the sites are listed based on the roles pass as obj 
  //This method is not used currently 
  getSites() {
      return this._http.get(this._urlgetsites) // returns an observable
         //using httpclient which doesnt require mapping to json as it is the default .map((response: Response) => response.json()) // .map converts observable to response of json format
          .catch(this._errorHandler); // to handle the http error
  }
  //TOD

  //To get the user name and role in case the sites are listed based on the roles pass as obj 
  getSitesList() {
      let headers = new Headers({
          'Content-Type':
          'application/json; charset=utf-8'
      });
      let options = new RequestOptions({ headers: headers });
      console.log('in service');
      
      return this._http.post(this._urlgetsites, {role:'dd'})
          //.map((response: Response) => response.json())
          .catch(this._errorHandler); // to handle the http error
  }

  //To get the list of elements
  getElements(siteId: any) {

      return this._http.post(this._urlgetelements, siteId)
         // .map((response: Response) => response.json())
          .catch(this._errorHandler); // to handle the http error
  }

  //To update the status of the elements
  updateStatus(elementstatuschange: any) {
      
    return this._http.post(this._urlsetstatus, elementstatuschange)
           // .map((response: Response) => response.json())
            .catch(this._errorHandler); // to handle the http error
    }

    
  //To get a single element properties
  getElement(_elementid :any){
    let headers = new Headers({
        'Content-Type':
        'application/json; charset=utf-8'
    });
    let options = new RequestOptions({ headers: headers });
    console.log('in service');
    var eleid = {
        elementid: _elementid // test value without using qr 
      }; 
    return this._http.post(this._urlgetelement, eleid)
        //.map((response: Response) => response.json())
        .catch(this._errorHandler); // to handle the http error

  }

  _errorHandler(error: Response) {
      console.error();
      return Observable.throw(error || "Server Error");
  }

}
