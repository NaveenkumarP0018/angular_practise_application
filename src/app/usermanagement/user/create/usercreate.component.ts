import { FormBuilder, FormGroup } from '@angular/forms';
import { AlertMessageService } from '../../../_services/AlertMessageService';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-usercreate',
  templateUrl: './usercreate.component.html',
  styleUrls: ['./usercreate.component.scss']
})
export class UsercreateComponent implements OnInit {
  patientForm: FormGroup;
  patientDetails: any[] = JSON.parse(localStorage.getItem('patientDetails')) || [];

  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<UsercreateComponent>,
    private router: Router, private alertMessage: AlertMessageService, public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public editData: any, private cdkref: ChangeDetectorRef, private datePipe: DatePipe) {

    this.patientForm = this.fb.group({
      riskScale: [null],
      contactParent: [null],
      childName: [null],
      lastHandlingData: [null],
      dob: [null],
    });
  }
  ngOnInit() {
    if (this.editData) {
      this.patientForm.patchValue(this.editData);
    }
  }

  createUser() {
    let patDtls = this.patientForm.value;
    if (!this.editData) {
      patDtls.id = this.patientDetails.length + 1;
      this.patientDetails.push(patDtls);
      patDtls.dob = this.datePipe.transform(patDtls.dob, "dd-MM-yyyy");
      localStorage.setItem('patientDetails', JSON.stringify(this.patientDetails));
      this.alertMessage.showAlert('successFuly vreated');
      this.dialogRef.close(true);
    } else {
      let ind = this.patientDetails.findIndex(x => x.id === this.editData.id);
      if (ind != -1) {
        patDtls.id = this.editData.id;
        patDtls.dob = this.datePipe.transform(patDtls.dob, "dd-MM-yyyy");
        let updatedData = this.patientDetails.splice(ind, 1, patDtls);
        console.log("updatedData=>", updatedData);
        localStorage.setItem('patientDetails', JSON.stringify(this.patientDetails));
        this.alertMessage.showAlert('successFuly updated');
        this.dialogRef.close(true);
      }
    }
  }
  ngDoCheck() {
    this.cdkref.detectChanges();
  }
  getStatusConfig(data?: any): MatDialogConfig {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    dialogConfig.disableClose = true;
    data ? dialogConfig.data = data : undefined;
    dialogConfig.disableClose = true;
    return dialogConfig
  }
}