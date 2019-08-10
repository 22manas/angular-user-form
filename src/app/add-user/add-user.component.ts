import { Component, OnInit } from '@angular/core';
import { AddUser } from '../add-user';

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const FORM_STATUS = {
    email: {
      error: false,
      errorMsg: ''
    },
    username: {
      error: false,
      errorMsg: ''
    }
  };
const NULL_FORM_STATUS = {
    email: {
      error: true,
      errorMsg: 'something went wrong'
    },
    username: {
      error: true,
      errorMsg: 'something went wrong'
    }
  };
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  newUser: AddUser = new AddUser();
  formStatus: any = this.setFormStatus('', true);
  constructor() {
    console.log('new User', this.newUser);
   }

  ngOnInit() {
  }

  addHandler() {
    let status = this.validateUser(this.newUser);
    console.log({fs: this.formStatus});
    console.log({status});
  }

  validateUser(user) {
    console.log({user});
    console.log({userValid: !EMAIL_REGEX.test(user.email)});
    this.setFormStatus('', true);
    if(!EMAIL_REGEX.test(user.email)) {
      this.setFormStatus('email');
      return this.statusBuilder(false, 'Email is invalid');
    }

    if(user.username === '') {
      this.setFormStatus('username');
      return this.statusBuilder(false, 'Username can not be empty');
    }

    return this.statusBuilder();
  }

  statusBuilder(valid?: boolean, msg?: string) {
    return {
      valid: valid === true ? true : false,
      error: msg ? msg : ''
    }
  }

  setFormStatus(field, reset?: boolean) {
    if(reset) {
      return Object.create(FORM_STATUS);
    }
    let currentStaus = Object.assign({},FORM_STATUS);
    console.log({old:FORM_STATUS,1: JSON.parse(JSON.stringify(currentStaus))});
    switch(field) {
      case 'email':
        currentStaus.email.error = true;
        currentStaus.email.errorMsg = 'Email is Inalid';
        console.log({2: JSON.parse(JSON.stringify(currentStaus))});
        break;
      case 'username':
        currentStaus.username.error = true;
        currentStaus.username.errorMsg = 'Usename is Inalid';
      console.log({3: JSON.parse(JSON.stringify(currentStaus))});
        break;
      default:
        currentStaus = Object.create(NULL_FORM_STATUS);
    }
    console.log({currentStaus});
    this.formStatus = currentStaus;
  }
}