import { Routes } from '@angular/router';

import { SigninComponent } from './login/signin/signin.component';
import { SignupComponent } from './login/signup/signup.component';
import { AdminLayoutComponent } from './core';

export const AppRoutes: Routes = [
  {
    path: '',
    component: SigninComponent
  },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: "patientRecords",
        loadChildren: () => import('./usermanagement/user/user.module').then(m => m.UserModule)
      },
      {
        path: "shedule",
        loadChildren: () => import('./shedulebooking/shedulebooking.module').then(m => m.ShedulebookingModule)
      },
      {
        path: "messages",
        loadChildren: () => import('./message/message.module').then(m => m.MessageModule)
      }
    ]
  },
  {
    path: 'signup',
    component: SignupComponent
  }
];
