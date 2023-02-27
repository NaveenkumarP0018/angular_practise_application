import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { logoutResponse } from '../../login/_models/login';

@Component({
  selector: 'app-unerror',
  template: `<div class="session">
  <div class="session-content text-xs-center">
    <div>
      <div class="error-subtitle">Your Session has Expired...!</div>
      <p class="mat-text-muted"> <a (click)="click()">Click login here</a></p>
    </div>
  </div>
</div>
`,
  styleUrls: ['./error.component.scss']
})
export class UnErrorComponent implements OnInit {
  // <div class="error-title">401</div>
  constructor(private router: Router, private dialog: MatDialog) {
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
