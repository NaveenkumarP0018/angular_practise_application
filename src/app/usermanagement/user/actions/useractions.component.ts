import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertMessageService } from '../../../_services/AlertMessageService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-useractions',
  templateUrl: './useractions.component.html',
  styleUrls: ['./useractions.component.scss']
})
export class UserActionsComponent implements OnInit {

  public deleteAction: boolean = false;
  private _userdata: any;
  patientDetails: any[] = JSON.parse(localStorage.getItem('patientDetails')) || [];

  constructor(private dialogRef: MatDialogRef<UserActionsComponent>, private alertMessage: AlertMessageService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this._userdata = data.data;
    switch (this.data.action) {
      case "DELETE":
        this.deleteAction = true;
        break;
    }
  }

  ngOnInit() {
  }

  onDeleteUser() {
    let ind = this.patientDetails.findIndex(x => x.id === this._userdata.id);
    if (ind != -1) {
      localStorage.setItem('patientDetails', JSON.stringify(this.patientDetails.filter(x=>x.id !== this._userdata.id)));
      this.alertMessage.showAlert('successFuly updated');
      this.dialogRef.close(true);
    }
  }

  onNoClick() {
    console.log('onNoClick :');
    this.dialogRef.close(false);
  }

}
