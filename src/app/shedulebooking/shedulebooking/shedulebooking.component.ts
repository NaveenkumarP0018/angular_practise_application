import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AlertMessageService } from '../../_services/AlertMessageService';
import { ActionsComponent } from '../actions/actions.component';

@Component({
  selector: 'app-shedulebooking',
  templateUrl: './shedulebooking.component.html',
  styleUrls: ['./shedulebooking.component.scss']
})
export class ShedulebookingComponent implements OnInit {
  patientForm: FormGroup;
  constructor(private dialog: MatDialog, private fb: FormBuilder, private alertMessage: AlertMessageService) {
  }

  ngOnInit(): void {
    this.patientForm = this.fb.group({
      childName: [null],
      meetingData: [null],
    });
  }
  scheduleMeeting() {
    if (this.patientForm.value.childName != null && this.patientForm.value.meetingData != null) {
      this.openUserActionDialog({ "data": 'newMeetings', "action": 'DELETE' });
      this.patientForm.get('childName').setValue(null);
      this.patientForm.get('meetingData').setValue(null);
    } else {
      this.alertMessage.showAlert('Please fill the Details');
    }
  }
  openUserActionDialog(data: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.data = data;
    let dialogRef = this.dialog.open(ActionsComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      console.log("Result :: " + result);
    });
  }
}
