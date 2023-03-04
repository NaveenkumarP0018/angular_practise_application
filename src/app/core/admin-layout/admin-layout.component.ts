import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-layout',
  templateUrl: './admin-layout.component.html'
})
export class AdminLayoutComponent {
  constructor(private router: Router) {
  }
  handleClick(menuitem) {
    this.router.navigate(['/' + menuitem]);
  }
}
