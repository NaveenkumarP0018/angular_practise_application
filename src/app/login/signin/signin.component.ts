import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActionType, AlertMessageService } from '../../_services/AlertMessageService';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  form: FormGroup;
  error: boolean = false;
  loginlist: any
  loading = false;
  autoLoading: boolean = true;
  messageflag: boolean;
  message: string;
  loginPageFlag: boolean = false;
  users: any[] = JSON.parse(localStorage.getItem('users')) || [];
  constructor(public router: Router, private fb: FormBuilder,private alertMessage:AlertMessageService) {
    history.pushState(null, "", window.location.href);
    window.onpopstate = function () {
      window.history.pushState(null, "", window.location.href);
    };
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: [''],
      password: ['']
    });
    localStorage.removeItem('users')
    localStorage.removeItem('patientDetails')
  }
  redirectTo() {
    this.router.navigate(['/signup']);
  }
  onSubmit(form) {
    let newuser = this.form.value;
    let filteredUsers = this.users.filter(user => {
      return user.name === newuser.name && user.password === newuser.password;
    });
    console.log("filteredUsers", filteredUsers, this.users)
    if (filteredUsers.length) {
      this.router.navigate(['/patientRecords']);
      this.messageflag = false;
    } else {
      this.alertMessage.showAlert('Failed To Login',ActionType.ERROR)
    }
  }
}
