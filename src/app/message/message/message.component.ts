import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AlertMessageService } from '../../_services/AlertMessageService';
const patientDetils: any[] = [
  { id: 1, patientName: "Low", message: "2970157", Status: "James" },
  { id: 2, patientName: "High", message: "2970158", Status: "Diana" },
  { id: 3, patientName: "Modarate", message: "2970159", Status: "Kailash" },
  { id: 4, patientName: "Modarate", message: "2970150", Status: "Abdul" },
  { id: 5, patientName: "High", message: "2970161", Status: "Mohammed" },
  { id: 6, patientName: "Low", message: "2970162", Status: "Mohammed" }
];
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  listflag: boolean = false;
  initPage = 0;
  listPage = 0;
  pageSize = 5;
  totalUsers: any[] = [];
  loading: boolean = false;
  displayedColumns = ['patientName', 'message', 'Status'];
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  dataSource = new MatTableDataSource(patientDetils);
  data = JSON.parse(localStorage.getItem('patientDetails')) || [];
  constructor(private dialog: MatDialog, private router: Router, private alertMessage: AlertMessageService) { }

  ngOnInit(): void {
    // this.getUsers();
  }
  getUsers() {
    // this.userService.getAllUsers().subscribe((response: IUser[]) => {
    if ((JSON.parse(localStorage.getItem('patientDetails')) || []).length > 0) {
      console.log("Response==>", JSON.parse(localStorage.getItem('patientDetails')) || []);
      this.totalUsers = JSON.parse(localStorage.getItem('patientDetails')) || [];
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

  getData(_pageData) {
    let index = 0;
    let startingIndex = _pageData.pageIndex * _pageData.pageSize;
    let endingIndex = startingIndex + _pageData.pageSize;
    this.initPage = _pageData.pageIndex;
  }

  getListData(_pageData) {
    // this.dataSource.paginator = this.paginator;
    let index = 0;
    let startingIndex = _pageData.pageIndex * _pageData.pageSize;
    let endingIndex = startingIndex + _pageData.pageSize;
    this.dataSource = new MatTableDataSource(this.totalUsers)
  }

  loadList() {
    this.listflag = true;
    this.listPage = 0;
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate =
      (data: any, filter: string) => (data.lastname != null && data.lastname.toLowerCase().indexOf(filter.toLowerCase()) > -1 ||
        data.firstname.toLowerCase().indexOf(filter.toLowerCase()) > -1 ||
        data.login.toLowerCase().indexOf(filter.toLowerCase()) > -1 ||
        // (data.depts.length > 0 ? data.depts.findIndex(x => x.deptName.toLowerCase().indexOf(filter.toLowerCase()) > -1) > -1 : false) ||
        (data.roles.length > 0 ? data.roles.findIndex(x => x.roleName.toLowerCase().indexOf(filter.toLowerCase()) > -1) > -1 : false));
  }

  sortData() {
    this.dataSource.sort = this.sort
  }
}
