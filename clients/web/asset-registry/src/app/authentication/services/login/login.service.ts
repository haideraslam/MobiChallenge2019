// =================================== Imports ====================================== //
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/do';

import { Routes } from '../../../routes';
// =================================== Imports ====================================== //

// =================================== Services ===================================== //
// =================================== Services ===================================== //

@Injectable()
export class LoginService {
  constructor(private http: HttpClient) { }

  loginService(viewModel: any) {
    return this.http.post(Routes.checkLoginCredentials, viewModel);
  }
}
