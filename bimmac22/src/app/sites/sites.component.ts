import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
import { BimserviceService} from '../bimservice.service';
import { MdDialog, MdDialogRef } from '@angular/material'

import { QrscannerbimComponent } from '../qrscannerbim/qrscannerbim.component'

@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.css']
})
export class SitesComponent implements OnInit {

  sites = [];
  errorMessage: string;
  dialogRefscanner: MdDialogRef<QrscannerbimComponent>;
  selected :any;
  
  

  constructor(private _siteService: BimserviceService, private router: Router, private route: ActivatedRoute, public dialog : MdDialog) { }
  
  // TODO
  //Instead of ngOnInit use ngAfterChange
  ngOnInit() {
    
    this._siteService.getSitesList()
    .subscribe(resSiteData => {this.sites = resSiteData as string []},
    resSiteError =>{this.errorMessage = resSiteError as string} );
    //this._siteService.getSites1(this.myModel);
  }

  //On selecting the site the elements components is called.
  onSelect(site) {
    this.selected = site;    
    //To implement relative routing in next version
    //this.router.navigate(['elements',site.siteid, {relativeTo: this.route}]);
    // Using absolute path
    this.router.navigate(['/home/elements',site.siteid]);
  }

  isActive(item) {
    return this.selected === item;
  };

  onSubmit(testt) {}

  onSelectForScan(){
   this.openDialog();
  }
  openDialog(){
    console.log('opeining scanner');
    this.dialogRefscanner = this.dialog.open(QrscannerbimComponent); //,{data: {name: 'test'},}
    //this.dialogRef.afterClosed().subscribe((result) =>{
      //  console.log(result.ncknm);
    //}) 
}
}
