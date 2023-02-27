import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { logoutResponse } from '../../login/_models/login';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  constructor(private router: Router,private dialog: MatDialog) {
    history.pushState(null, "", window.location.href);
    window.onpopstate = function () {
      window.history.pushState(null, "", window.location.href);
    };
  }

  ngOnInit() {
  }
  click() {
    this.router.navigate(['/']);
  }

}
