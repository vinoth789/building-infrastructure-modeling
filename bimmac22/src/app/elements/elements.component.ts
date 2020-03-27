import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { MdDialog, MdDialogRef, MdSelectModule } from '@angular/material'
import { MdTableModule } from '@angular/material';
import { BimserviceService } from '../bimservice.service'
import { PopupComponent} from '../popup/popup.component'

@Component({
  selector: 'app-elements',
  templateUrl: './elements.component.html',
  styleUrls: ['./elements.component.css']
})
export class ElementsComponent implements OnInit {
  
  elements = [];
  revelement :any;  
  public siteId;
  dialogRef: MdDialogRef<PopupComponent>;
  errorMessage: string;
  timestamp: string;  

  myModel = [];
  sites1 = [];
  validid: boolean;
  message: string;
  statusmessage: string;
  elementupdatestatus: boolean;
  selected :any;  
  selectedValue: string;
  
    statuses = [
      {value: 'notstarted', viewValue: 'Not Started'},
      {value: 'inprogress', viewValue: 'In Progress'},
      {value: 'completed', viewValue: 'Completed'}
    ];

  constructor(private _bimservice: BimserviceService, private route: ActivatedRoute, private router: Router
    , public dialog : MdDialog) { }
  
  ngOnInit() {

    console.log('int elements component');
    this.route.params.subscribe((params: Params) => {
      let id = parseInt(params['id']);
      this.siteId = id;
  
      this._bimservice.getElements(this.siteId)
          .subscribe(resElementData => {this.elements = resElementData; console.log(this.elements)},
            resElementError => {this.errorMessage = resElementError});
  })

  }

  reloadWithNewId(id: number) {
    this.router.navigate(['/elements', this.siteId]);
  }

  // On selecting the element this method is used to get the corresponding status of the elements 
  onSelect(element) {
    for (let element of this.elements) {
      console.log(element.status); // 1, "string", false
    }
    this.openDialog(element);
    
  }

  onChange(element,selectedStatus) {

    console.log(selectedStatus.value);
    console.log(element.status);
    this.revelement = element;
    var tmstmp = new Date();    
    this.timestamp = tmstmp.getDate()+'/' + (tmstmp.getMonth()+1) +'/'+ tmstmp.getFullYear();
    if(selectedStatus.value == 'inprogress'){
      this.revelement.elementstatus.inprogress = this.timestamp; 
      this.revelement.status = 'In Progress';
    } else if(selectedStatus.value == 'notstarted'){
      this.revelement.elementstatus.notstarted = this.timestamp;       
      this.revelement.status = 'Not Started'
    }else if(selectedStatus.value == 'completed'){
      this.revelement.elementstatus.completed = this.timestamp;             
      this.revelement.status = 'Completed';
    }

    

    var elementstatuschange = {
      elementId: element.elementid,
      elementStatus: selectedStatus,
    };
    //Calling the service to update the new status of the elements
    this._bimservice.updateStatus(this.revelement)
    .subscribe(resElementData => {this.revelement = resElementData;if(this.revelement._rev != element._rev){
      element = this.revelement;
    }}, //;console.log(this.elementupdatestatus)
      resElementError => {this.errorMessage = resElementError});

      if(this.revelement._rev != element._rev){
        element = this.revelement;
      }
}


  openDialog(element){
    console.log(element);
    this.dialogRef = this.dialog.open(PopupComponent,{data:element,}); //,{data: {name: 'test'},}
    //this.dialogRef.afterClosed().subscribe((result) =>{
      //  console.log(result.ncknm);
    //}) 
}

}