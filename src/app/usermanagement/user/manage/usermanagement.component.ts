import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogConfig, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UsercreateComponent } from '../create/usercreate.component';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { AlertMessageService } from '../../../_services/AlertMessageService';
import { UserActionsComponent } from '../actions/useractions.component';

const patientDetils: any[] = [
  { id: 1, riskScale: "Low", contactParent: "2970157", childName: "James", lastHandlingData: "Stuart", dob: "28-11-2022" },
  { id: 2, riskScale: "High", contactParent: "2970158", childName: "Diana", lastHandlingData: "Piholu", dob: "29-11-2022" },
  { id: 3, riskScale: "Modarate", contactParent: "2970159", childName: "Kailash", lastHandlingData: "Kumar", dob: "30-11-2022" },
  { id: 4, riskScale: "Modarate", contactParent: "2970150", childName: "Abdul", lastHandlingData: "Rahman", dob: "01-01-2023" },
  { id: 5, riskScale: "High", contactParent: "2970161", childName: "Mohammed", lastHandlingData: "Razzak", dob: "02-01-2023" },
  { id: 6, riskScale: "Low", contactParent: "2970162", childName: "Mohammed", lastHandlingData: "Ali", dob: "03-01-2023" }
];

@Component({
  selector: 'app-usermanagement',
  templateUrl: './usermanagement.component.html',
  styleUrls: ['./usermanagement.component.scss']
})
export class UsermanagementComponent implements OnInit {
  pageSize = 5;
  public searchdata: string = '';
  totalUsers: any[] = [];
  public filterUsers: any[] = [];
  displayedColumns = ['riskScale', 'contactParent', 'childName', 'lastHandlingData', 'dob', 'actions'];
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  dataSource = new MatTableDataSource();
  data = JSON.parse(localStorage.getItem('patientDetails')) || [];
  constructor(private dialog: MatDialog, private router: Router, private alertMessage: AlertMessageService
  ) {
  }

  ngOnInit() {
    this.getUsers();
  }
  applyFilterDataSouce(filterValue: string) {
    if (filterValue == '' || filterValue == null) {
      this.dataSource = new MatTableDataSource(this.totalUsers);
    }
    else {
      this.dataSource.filter = filterValue.toLowerCase().trim();
      this.dataSource.paginator = null;
      this.dataSource.filterPredicate =
        (data: any, filter: string) => (data.contactParent != null && data.contactParent.toLowerCase().indexOf(filter.toLowerCase()) > -1 ||
          data.childName.toLowerCase().indexOf(filter.toLowerCase()) > -1)
    }
  }

  getUsers() {
    if ((JSON.parse(localStorage.getItem('patientDetails')) || []).length > 0) {
      this.totalUsers = JSON.parse(localStorage.getItem('patientDetails')) || [];
      this.dataSource = new MatTableDataSource(JSON.parse(localStorage.getItem('patientDetails')) || []);
      this.dataSource.paginator = this.paginator;
    } else {
      localStorage.setItem('patientDetails', JSON.stringify(patientDetils));
      this.totalUsers = patientDetils;
      this.dataSource = new MatTableDataSource(patientDetils);
    }
  }

  ngAfterViewInit() {
    setTimeout(() => { this.dataSource.sort = this.sort, this.dataSource.paginator = this.paginator });
  }

  addUser() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '30vw'; dialogConfig.height = '92%';
    dialogConfig.panelClass = 'rightdailog'; dialogConfig.position = { right: '0px' };
    dialogConfig.disableClose = true;
    this.dialogOpen(dialogConfig);
  }

  dialogOpen(dialogConfig: any) {
    dialogConfig.width = "40%";
    const dialogRef = this.dialog.open(UsercreateComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      console.log("Result :: " + result);
      if (result) {
        this.getUsers();
      }
    });
  }

  editUser(userdetails: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '30vw'; dialogConfig.height = '92%';
    dialogConfig.panelClass = 'rightdailog'; dialogConfig.position = { right: '0px' };
    dialogConfig.disableClose = true;
    dialogConfig.data = userdetails;
    this.dialogOpen(dialogConfig);
  }

  sortData() {
    this.dataSource.sort = this.sort
  }
  openUserActionDialog(data: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.data = data;
    let dialogRef = this.dialog.open(UserActionsComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      console.log("Result :: " + result);
      if (result) {
        this.getUsers();
      }
    });
  }
  deleteUser(userdetails: any): void {
    this.openUserActionDialog({ "data": userdetails, "action": 'DELETE' });
  }
}