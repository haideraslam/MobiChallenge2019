// =================================== Imports ====================================== //
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// =================================== Imports ====================================== //

@Injectable()
export class HttpService {

  constructor(private http: HttpClient) { }

  get(url: string, credentialsRequired = false) {
    const headers = new HttpHeaders();
    return this.http.get(url, { withCredentials: credentialsRequired, headers });
  }

  getWithCredentials(url: string, withCredential: boolean) {
    const headers = new HttpHeaders();
    return this.http.get(url, { withCredentials: withCredential, headers });
  }

  post(url: string, body = {}, credentialsRequired = false) {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'multipart/form-data');
    return this.http.post(url, body, { withCredentials: credentialsRequired, headers });
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
