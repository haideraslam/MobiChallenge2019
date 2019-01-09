// =================================== Imports ====================================== //
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment';
// =================================== Imports ====================================== //

// =================================== Services ===================================== //
// =================================== Services ===================================== //

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  Passphrase = '';
  loginURL = '';

  constructor(private router: Router) { }

  ngOnInit() {
    this.loginURL = environment.loginURL || 'http://aarvm2.westeurope.cloudapp.azure.com:3000/auth/google';
  }
}
