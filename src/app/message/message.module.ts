import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageComponent } from './message/message.component';
import { RouterModule } from '@angular/router';
import { MessagesRoutes } from './message.routing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../_shared/material.module';
@NgModule({
  declarations: [
    MessageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(MessagesRoutes),
    FlexLayoutModule,
    MaterialModule
  ]
})
export class MessageModule { }
