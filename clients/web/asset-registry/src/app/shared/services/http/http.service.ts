// =================================== Imports ====================================== //
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
// =================================== Imports ====================================== //

@Injectable()
export class HttpService {

  constructor(private http: HttpClient) { }

  get(url: string) {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'multipart/form-data');
    return this.http.get(url, { withCredentials: true, headers });
  }

  getWithCredentials(url: string, withCredential: boolean) {
    const headers = new HttpHeaders();
    return this.http.get(url, { withCredentials: withCredential, headers });
  }

  post(url: string, body = {}) {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'multipart/form-data');
    return this.http.post(url, body, { withCredentials: true, headers });
  }

  postWithResponseType(url: string, body = {}, responseType: any) {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'multipart/form-data');
    return this.http.post(url, body, { withCredentials: false, headers, responseType: responseType });
  }
  
  postWithCredentials(url: string, body = {}, withcredentials: boolean) {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'multipart/form-data');
    return this.http.post(url, body, { withCredentials: withcredentials, headers });
  }
}
