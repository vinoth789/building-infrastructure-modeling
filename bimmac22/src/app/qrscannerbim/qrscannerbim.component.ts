import { Component, OnInit } from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material'
import { BimserviceService} from '../bimservice.service';
import {MD_DIALOG_DATA} from '@angular/material'; //import {MD_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-qrscannerbim',
  templateUrl: './qrscannerbim.component.html',
  styleUrls: ['./qrscannerbim.component.css']
})
export class QrscannerbimComponent implements OnInit {

  qrstring: string;
  element = [];
  test:string;
  errorMessage: string;
  isValid: boolean;
  
  constructor(private _bimservice: BimserviceService, public dialogRef: MdDialogRef<QrscannerbimComponent>) { }

  ngOnInit() {    
    this.isValid = false;
    console.log('update');
  }

  decodedOutput(qrstring: any){
    console.log(qrstring.value);
    console.log('the event:', qrstring);
    
    this._bimservice.getElement(qrstring)
    .subscribe(resElementData => {this.element = resElementData;console.log(this.element);this.isValid = true;
      console.log(this.isValid)},
      resElementError => {this.errorMessage = resElementError})
    }
  }
  
