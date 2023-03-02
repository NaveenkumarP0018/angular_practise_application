import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TooltipPosition } from '@angular/material/tooltip';
import { ActionType, AlertMessageService } from '../../_services/AlertMessageService';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  //tooltip
  positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];
  position = 'above';
  showExtraClass = true;
  public rolesCollection: any[];
  signupForm: FormGroup;
  users: any[] = JSON.parse(localStorage.getItem('users')) || [];

  constructor(private fb: FormBuilder, private router: Router, private alertMessage: AlertMessageService) {
  }

  ngOnInit() {
    this.signupForm = this.fb.group({
      name: [''],
      password: [''],
      email: ['']
    });
  }
  redirectTo() {
    this.router.navigate(['/'])
  }
  saveData() {
    let newUser = this.signupForm.value;
    let duplicateUser = this.users.filter(user => { return user.name === newUser.name; }).length;
    if (duplicateUser) {
      this.alertMessage.showAlert(`Username ${newUser.name} is already taken`, ActionType.ERROR)
    } else {
      newUser.id = this.users.length + 1;
      this.users.push(newUser);
      localStorage.setItem('users', JSON.stringify(this.users));
      this.alertMessage.showAlert(`Username ${newUser.name} is sucessfully Added`, ActionType.SUCCESS)
    }
  }
}