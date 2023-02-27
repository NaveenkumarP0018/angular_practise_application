import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { logoutResponse } from '../../login/_models/login';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  constructor(private router: Router, private dailogue: MatDialog) {
  }

  ngOnInit() {
  }
  click() {
    this.router.navigate(['/']);
  }

}
