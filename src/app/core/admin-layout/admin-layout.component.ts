import { Component, ElementRef, NgZone, OnInit, OnDestroy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';
import { Router } from '@angular/router';

// import { PerfectScrollbarConfigInterface, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';

const SMALL_WIDTH_BREAKPOINT = 960;

@Component({
  selector: 'app-layout',
  templateUrl: './admin-layout.component.html'
})
export class AdminLayoutComponent implements OnInit, OnDestroy {

  private _router: Subscription;
  config: any;
  mediaMatcher: MediaQueryList = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);
  url: string;
  sidePanelOpened;
  options = {
    collapsed: false,
    compact: false,
    boxed: false,
    dark: false,
    dir: 'ltr'
  };
  @ViewChild('sidemenu', { static: false }) sidemenu;


  constructor(private cdRef: ChangeDetectorRef, private _element: ElementRef,
    zone: NgZone, private router: Router) {
    this.mediaMatcher.addListener(() => zone.run(() => {
      this.mediaMatcher = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);
    }));
  }

  ngOnInit(): void {
    this.cdRef.detectChanges();
  }
  ngOnDestroy(): void {
    if (this._router)
      this._router.unsubscribe();
  }

  runOnRouteChange(): void {
    if (this.isOver()) {
      this.sidemenu.close();
    }

    this.updatePS();
  }

  isOver(): boolean {
    if (this.url === '/apps/messages' ||
      this.url === '/apps/calendar' ||
      this.url === '/apps/media' ||
      this.url === '/maps/leaflet' ||
      this.url === '/taskboard' || this.url === '/profile') {
      return true;
    } else {
      return this.mediaMatcher.matches;
    }
  }

  menuMouseOver(): void {
    console.log(' menuMouseOver =>');

    if (this.mediaMatcher.matches && this.options.collapsed) {
      this.sidemenu.mode = 'over';
    }
  }

  menuMouseOut(): void {
    console.log(' menuMouseOut =>');
    if (this.mediaMatcher.matches && this.options.collapsed) {
      this.sidemenu.mode = 'side';
    }
  }

  updatePS(): void {
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
