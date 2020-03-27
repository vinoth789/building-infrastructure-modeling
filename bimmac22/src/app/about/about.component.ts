import { Component, Inject } from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material'
import {MD_DIALOG_DATA} from '@angular/material'; //import {MD_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {

  constructor(@Inject(MD_DIALOG_DATA) public data: any[]) {
    console.log(data);
    }

}
