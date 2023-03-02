import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-layout',
  templateUrl: './admin-layout.component.html'
})
export class AdminLayoutComponent implements OnInit {


  constructor(private cdRef: ChangeDetectorRef, private router: Router) {
  }

  ngOnInit(): void {
    this.cdRef.detectChanges();
  }
  handleClick(menuitem, action: boolean) {
    let currenturl = this.router.url;
    console.log('handleClick =>', menuitem, this.router.url);
    if ('/' + menuitem == currenturl) {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        this.router.navigate(['/' + menuitem]));
    }
    else {
      this.router.navigate(['/' + menuitem]);
    }
  }
}
