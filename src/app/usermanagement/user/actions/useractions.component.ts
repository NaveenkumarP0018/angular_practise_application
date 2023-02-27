import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertMessageService, ActionType } from '../../../_services/AlertMessageService';
import { Router } from '@angular/router';
import { UserActions } from '../_model/usermodel';

@Component({
  selector: 'app-useractions',
  templateUrl: './useractions.component.html',
  styleUrls: ['./useractions.component.scss']
})
export class UserActionsComponent implements OnInit {

  public deleteAction: boolean = false;
  loading: boolean = false;
  private _userdata: any;
  patientDetails: any[] = JSON.parse(localStorage.getItem('patientDetails')) || [];

  constructor(private dialogRef: MatDialogRef<UserActionsComponent>, private alertMessage: AlertMessageService,
    private router: Router,
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
    this.loading = true;
    let ind = this.patientDetails.findIndex(x => x.id === this._userdata.id);
    if (ind != -1) {
      this.loading = false;
      let updatedData = this.patientDetails.splice(ind, 1);
      console.log("updatedData=>", updatedData);
      localStorage.setItem('patientDetails', JSON.stringify(this.patientDetails));
      this.alertMessage.showAlert('successFuly updated', ActionType.SUCCESS, 10);
      this.dialogRef.close(true);
    }
  }

  showAlert(error: any, action: ActionType, status: number = 0) {
    if (status == 401 || status == 403)
      this.router.navigate([status + '']);
    else setTimeout(() => this.alertMessage.showAlert(error, action));
  }

  onNoClick() {
    console.log('onNoClick :');
    this.dialogRef.close(false);
  }

}
