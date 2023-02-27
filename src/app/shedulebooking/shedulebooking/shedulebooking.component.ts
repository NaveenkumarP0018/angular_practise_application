import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActionType, AlertMessageService } from '../../_services/AlertMessageService';
import { ActionsComponent } from '../actions/actions.component';

@Component({
  selector: 'app-shedulebooking',
  templateUrl: './shedulebooking.component.html',
  styleUrls: ['./shedulebooking.component.scss']
})
export class ShedulebookingComponent implements OnInit {
  patientForm: FormGroup;
  sheduledDeatils: any[] = JSON.parse(localStorage.getItem('meetingShedules')) || [];
  isSubmitedMeeting: boolean = false;
  constructor(private dialog: MatDialog, private fb: FormBuilder, private alertMessage: AlertMessageService) {
    localStorage.setItem('meetingShedules', JSON.stringify([]));

  }

  ngOnInit(): void {
    this.patientForm = this.fb.group({
      childName: [null],
      meetingData: [null],
    });
  }
  scheduleMeeting() {
    // this.isSubmitedMeeting = true;
    if (this.patientForm.value.childName != null && this.patientForm.value.meetingData != null) {
      console.log("scheduleDetils", JSON.parse(localStorage.getItem('meetingShedules')), this.sheduledDeatils, this.patientForm.value);
      let newMeetings = [...JSON.parse(localStorage.getItem('meetingShedules')) || [], this.patientForm.value];
      localStorage.setItem('meetingShedules', JSON.stringify(newMeetings));
      this.openUserActionDialog({ "data": newMeetings, "action": 'DELETE' });
      this.patientForm.get('childName').setValue(null);
      this.patientForm.get('meetingData').setValue(null);
    } else {
      this.alertMessage.showAlert('Please fill the Details', ActionType.ERROR);
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
