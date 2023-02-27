import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { UsermanagementComponent } from './manage/usermanagement.component';
import { UserRoutes } from './user.routing';
import { UsercreateComponent } from './create/usercreate.component';
import { UserFilterPipe } from './_model/userFilterPipe';
import { MaterialModule } from '../../_shared/material.module';
import { UserActionsComponent } from './actions/useractions.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(UserRoutes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    Ng2SearchPipeModule,
    MaterialModule
  ],
  declarations: [UsermanagementComponent, UsercreateComponent, UserFilterPipe,UserActionsComponent],
  entryComponents: [UsermanagementComponent, UsercreateComponent,UserActionsComponent],
  providers: [
    DatePipe
  ]
})

export class UserModule {

}
