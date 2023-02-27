# Primer

Primer is a creative material design admin template built with Angular 2. It comes out of the box with AoT and lazy loading support, Language translation , RTL support and light and dark colour schemes. With this, you get all you need to start working on your SAAS, CRM, CMS or dashboard based project.

Once you've purchased Primer please consider giving a `5 star rating`, it helps in pushing out more updates and adding a lot more features.

####Key Features Include:
* LTR/RTL Support
* Angular 2
* Material design
* AoT compilation
* Fully responsive (Mobile, Tablet, Desktop)
* Well documented (Both online and offline)
* Easy to customise
* Language translation

This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.32.3.

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


## Code modified in node_modules @mat-datetimepicker/core/fesm5/mat-datetimepicker-core.js

# To set Time range based on the camp_startTime and cam_endTime of global settings


Add this code next to the line.No-2103 >>
      
        if(window["startTime"] && window["endTime"])
        {
            let selectminite=date.getMinutes()+'';
            var starttime= +(window["startTime"]).replace(':',''),endtime=+(window["endTime"]).replace(':',''), selectstarttime=date.getHours()+(selectminite.length==1?'0'+selectminite:selectminite);
            console.log("1234=>",starttime,endtime,selectstarttime,window["tran"]);
            if (starttime<=+selectstarttime&&endtime>=+selectstarttime || window["tran"]) {
            var clamped=this._adapter.clampDate(date, this.minDate, this.maxDate);
            if (date===clamped) {
            this._timeChanged=true;
            this.activeDate=clamped;
            this.activeDateChange.emit(this.activeDate);
             }
             }
        }
        else
        {
            var clamped=this._adapter.clampDate(date, this.minDate, this.maxDate);
            if (date===clamped) {
            this._timeChanged=true;
            this.activeDate=clamped;
            this.activeDateChange.emit(this.activeDate);
             }
        }
## previous Code:
        
        var clamped = this._adapter.clampDate(date, this.minDate, this.maxDate);
        if (date === clamped) {
            this._timeChanged = true;
            this.activeDate = clamped;
            this.activeDateChange.emit(this.activeDate);
        }

## Below are the Jspdf commands need to install when nodemodules newly install:
 
npm install jspdf@1.5.2 --save
npm install --save @types/jspdf
npm install jspdf-autotable


## Need to install ngx-mat-select-search and chartjs-plugin-labels for dashboard 

npm install ngx-mat-select-search

npm install chartjs-plugin-labels