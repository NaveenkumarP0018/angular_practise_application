import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AlertMessageService } from '../../_services/AlertMessageService';
const patientDetils: any[] = [
  { id: 1, patientName: "jack", message: "jack@gamil.com", Status: 1 },
  { id: 2, patientName: "mikal", message: "mikal@gamil.com", Status: 1 },
  { id: 3, patientName: "husaan", message: "hussan@gami.com", Status: 1 },
  { id: 4, patientName: "asha", message: "asha@gamil.com", Status: 1 },
  { id: 5, patientName: "srikanth", message: "srikanth@gmail.com", Status: 1 }
];
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  displayedColumns = ['patientName', 'message', 'Status'];
  dataSource = new MatTableDataSource(patientDetils);
  constructor() { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(patientDetils);
  }
  sendEmail(value) {
    let updatedValue = { ...value, Status: 2 };
    let ind = patientDetils.findIndex(x=>x.id === value.id);
    let updatedData = patientDetils.splice(ind, 1, updatedValue);
    console.log("updatedData=>", updatedData);
    this.dataSource = new MatTableDataSource(patientDetils);
  }
}
