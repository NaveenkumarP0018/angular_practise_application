import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {
  private _router: Subscription;
  config: any;
  activeTab: string = 'patientRecords';
  activeSubTab: string = '';
  menuitems: any[] = [{
    modulename: 'PatientRecords',
    link: 'patientRecords',
    moduleId: '1',
    icon: 'ti-user',
    submenu: [{
      'modulename': 'PatientRecords',
      'link': 'patientRecords',
      'moduleId': 1,
      'icon': 'ti-search',
    },
    {
      "modulename": "Dairy",
      "link": "dairy",
      "moduleId": 2,
      "icon":"ti-write"
    },
    {
      "modulename": "Month Graph",
      "link": "monthGraph",
      "moduleId": 3,
      "icon":"assets/images/pie-chart.png"
    },
    {
      "modulename": "Messages",
      "link": "messages",
      "moduleId": 4,
      "icon":""
    },
    {
      "modulename": "PatinentInfo",
      "link": "ptInfo",
      "moduleId": 5,
      "icon":""
    }
    ]
  }];
  _menuitemsLoad: any[] = [];
  healthChannelFlag: boolean = false;
  constructor(private router: Router) {
  }
  ngOnInit(): void {
    this._router = this.router.events.filter(event => event instanceof NavigationEnd)
      .subscribe((event: NavigationEnd) => {

        if (this.activeSubTab != event.url) {
          if (this._menuitemsLoad) {
            this.activeSubTab = event.url;
            let menuIndex = this._menuitemsLoad.findIndex(s => '/' + s.link == this.activeSubTab || s.submenu.findIndex(y => '/' + s.link + '/' + y.link == this.activeSubTab) != -1 || s.submenu.findIndex(y => '/' + y.link == this.activeSubTab) != -1);
            this.activeTab = menuIndex != -1 ? this._menuitemsLoad[menuIndex].link : 'patientRecords';
          }
        }

      });
  }
  ngOnDestroy(): void {
    if (<any>this._router)
      this._router.unsubscribe();
  }
  handleClick(menuitem, action: boolean) {
    let currenturl = this.router.url;
    this.activeSubTab = '/' + menuitem.link;
    if (action)
      this.activeTab = menuitem.link;
    console.log('handleClick =>', menuitem.link, this.activeTab, this.activeSubTab, this.router.url);
    if ('/' + menuitem.link == currenturl) {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        this.router.navigate(['/' + menuitem.link]));
    }
    else {

      this.router.navigate(['/' + menuitem.link]);
    }
  }
}