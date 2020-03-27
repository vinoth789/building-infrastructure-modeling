import { Component, Inject } from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material'
import {MD_DIALOG_DATA} from '@angular/material'; //import {MD_DIALOG_DATA} from '@angular/material';



@Component({
  selector: 'my-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent  {

  //constructor(public dialogRef: MdDialogRef<PopupComponent>) { }
  constructor(@Inject(MD_DIALOG_DATA) public data: any[]) {
    console.log(data);
    

  }



}
