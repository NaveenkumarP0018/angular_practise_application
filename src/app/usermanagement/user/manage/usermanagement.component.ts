import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogConfig, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UsercreateComponent } from '../create/usercreate.component';
import { Router } from '@angular/router';
import { IUser } from '../_model/usermodel';
import * as _ from 'lodash';
import { AlertMessageService, ActionType } from '../../../_services/AlertMessageService';
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
  listflag: boolean = false;
  initPage = 0;
  listPage = 0;
  pageSize = 5;
  public searchdata: string = '';
  totalUsers: any[] = [];
  public filterUsers: any[] = [];
  loading: boolean = false;
  displayedColumns = ['riskScale', 'contactParent', 'childName', 'lastHandlingData', 'dob', 'actions'];
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  dataSource = new MatTableDataSource();
  _deptStatus: number = 1;
  _filterType = '';
  loadTotalUsers: IUser[] = [];
  roleType = '-1'
  depts = '-1'
  data = JSON.parse(localStorage.getItem('patientDetails')) || [];
  // _roledata: IUserRole[];
  // _deptdata: IDepartment[];
  _roleCode: string = '';
  constructor(private dialog: MatDialog, private router: Router, private alertMessage: AlertMessageService
  ) {
  }

  ngOnInit() {
    this.getUsers();
    console.log("naveen=>", document.querySelectorAll('listtable'))
  }
  applyFilterDataSouce(filterValue: string) {
    console.log('totalUsers=>', this.totalUsers);
    if (filterValue == '' || filterValue == null) {
      this.dataSource = new MatTableDataSource(this.totalUsers);
      this.getListData({ pageIndex: this.listPage, pageSize: this.pageSize });
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
    // this.userService.getAllUsers().subscribe((response: IUser[]) => {
    if ((JSON.parse(localStorage.getItem('patientDetails')) || []).length > 0) {
      console.log("Response==>", JSON.parse(localStorage.getItem('patientDetails')) || []);
      this.totalUsers = JSON.parse(localStorage.getItem('patientDetails')) || [];
      this.loadTotalUsers = JSON.parse(localStorage.getItem('patientDetails')) || [];
      this.dataSource = new MatTableDataSource(JSON.parse(localStorage.getItem('patientDetails')) || []);
      // this.getAllRoles();
      this.dataSource.paginator = null;
      this.listPage = 0;
      this.initPage = 0;
      this.getData({ pageIndex: this.initPage, pageSize: this.pageSize });
      this.getListData({ pageIndex: this.listPage, pageSize: this.pageSize });
    } else {
      localStorage.setItem('patientDetails', JSON.stringify(patientDetils));
      this.totalUsers = patientDetils;
      this.loadTotalUsers = patientDetils;
      this.dataSource = new MatTableDataSource(patientDetils);
      // this.getAllRoles();
      this.dataSource.paginator = null;
      this.listPage = 0;
      this.initPage = 0;
      this.getData({ pageIndex: this.initPage, pageSize: this.pageSize });
      this.getListData({ pageIndex: this.listPage, pageSize: this.pageSize });
    }
    this.loading = false;
    // }
  }

  ngAfterViewInit() {
    setTimeout(() => { this.dataSource.sort = this.sort, this.dataSource.paginator = this.paginator });
  }

  showAlert(error: any, action: ActionType, status: number = 0) {
    if (status == 401 || status == 403)
      this.router.navigate([status + '']);
    else setTimeout(() => this.alertMessage.showAlert(error, action));
  }

  getData(_pageData) {
    let index = 0;
    let startingIndex = _pageData.pageIndex * _pageData.pageSize;
    let endingIndex = startingIndex + _pageData.pageSize;
    this.filterUsers = this.totalUsers.filter(() => {
      index++;
      return (index > startingIndex && index <= endingIndex) ? true : false;
    });
    this.initPage = _pageData.pageIndex;
    console.log("UserData::" + JSON.stringify(this.filterUsers));
  }

  getListData(_pageData) {
    // this.dataSource.paginator = this.paginator;
    let index = 0;
    let startingIndex = _pageData.pageIndex * _pageData.pageSize;
    let endingIndex = startingIndex + _pageData.pageSize;
    this.filterUsers = this.totalUsers.filter(() => {
      index++;
      return (index > startingIndex && index <= endingIndex) ? true : false;
    });
    if (this.searchdata != '') {
      this.dataSource = new MatTableDataSource(this.totalUsers);
      this.dataSource.filter = this.searchdata.toLowerCase().trim();
      this.dataSource.filterPredicate =
        (data: any, filter: string) => (data.contactParent != null && data.contactParent.toLowerCase().indexOf(filter.toLowerCase()) > -1 ||
          data.childName.toLowerCase().indexOf(filter.toLowerCase()) > -1)
    }
    else {
      this.dataSource = new MatTableDataSource(this.filterUsers);
      this.listPage = _pageData.pageIndex;
    }
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
  loadList() {
    this.listflag = true;
    this.listPage = 0;
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate =
      (data: IUser, filter: string) => (data.lastname != null && data.lastname.toLowerCase().indexOf(filter.toLowerCase()) > -1 ||
        data.firstname.toLowerCase().indexOf(filter.toLowerCase()) > -1 ||
        data.login.toLowerCase().indexOf(filter.toLowerCase()) > -1 ||
        // (data.depts.length > 0 ? data.depts.findIndex(x => x.deptName.toLowerCase().indexOf(filter.toLowerCase()) > -1) > -1 : false) ||
        (data.roles.length > 0 ? data.roles.findIndex(x => x.roleName.toLowerCase().indexOf(filter.toLowerCase()) > -1) > -1 : false));
  }

  loadGrid() {
    this.listflag = false;
    this.initPage = 0;
    this.getData({ pageIndex: this.initPage, pageSize: this.pageSize });
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