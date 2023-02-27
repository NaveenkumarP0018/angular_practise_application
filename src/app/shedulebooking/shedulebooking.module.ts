import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ShedulebookingComponent } from './shedulebooking/shedulebooking.component';
import { RouterModule } from '@angular/router';
import { SheduleBookingRoutes } from './shedulebooking.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MaterialModule } from '../_shared/material.module';
import { ActionsComponent } from './actions/actions.component';

@NgModule({
  declarations: [
    ShedulebookingComponent,
    ActionsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(SheduleBookingRoutes),
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    Ng2SearchPipeModule,
    MaterialModule
  ],
  providers: [
    DatePipe
  ],
  entryComponents: [ActionsComponent]
})
export class ShedulebookingModule { }
