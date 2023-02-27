import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageComponent } from './message/message.component';
import { RouterModule } from '@angular/router';
import { MessagesRoutes } from './message.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MaterialModule } from '../_shared/material.module';



@NgModule({
  declarations: [
    MessageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(MessagesRoutes),
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    Ng2SearchPipeModule,
    MaterialModule
  ]
})
export class MessageModule { }
