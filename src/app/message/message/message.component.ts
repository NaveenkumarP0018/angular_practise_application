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
  displayedColumns = ['patientName', 'message', 'Status'];
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  dataSource = new MatTableDataSource(patientDetils);
  constructor() { }

  ngOnInit(): void {
    // this.getUsers();
    this.dataSource = new MatTableDataSource(patientDetils);
  }
}
