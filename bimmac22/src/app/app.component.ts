import { Component, OnInit, ViewChild } from '@angular/core';
import {RouterModule} from '@angular/router';

import { MdDialog, MdDialogRef } from '@angular/material'

import { Http, Response, URLSearchParams, RequestOptions, Headers } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
    validid: string;
    sites : string[];
    title = 'BIM';
    apiValues: string[] = [];
    constructor(private _httpService: HttpClient) { 
     }
    ngOnInit() {
    }
}
 