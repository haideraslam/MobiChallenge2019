import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { HttpService } from '../../shared/services/http/http.service';

import { Routes } from '../../routes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload-documents',
  templateUrl: './upload-documents.component.html',
  styleUrls: ['./upload-documents.component.css']
})
export class UploadDocumentsComponent implements OnInit {

  photograph: File;
  photograph_image: string | ArrayBuffer;
  @ViewChild('photograph') _photograph: ElementRef;

  document: File;
  photograph_document: string | ArrayBuffer;
  @ViewChild('document') _document: ElementRef;

  obj = {
    $class: 'netsol.innovation.aar.participants.model.UploadKyc',
    renter: 'resource:netsol.innovation.aar.participants.model.Renter#RNTR1',
    kycDetails: {
      $class: 'netsol.innovation.aar.participants.model.KYCDetails',
      idDocument: '',
      picture: ''
    }
  };

  constructor(private http: HttpService, private router: Router) { }

  ngOnInit() { }

  saveClicked() {
    this.http.post(Routes.MULTI_USER + Routes.UPLOAD_KYC, this.obj);
    this.router.navigate(['/confirm-booking']);
  }

  uploadPhotographClicked() {
    this._photograph.nativeElement.click();
  }

  uploadPhotograph(files: FileList) {
    this.photograph = files.item(0);
    if (this.photograph.type === 'image/jpeg' || this.photograph.type === 'image/png') {
      const fileReader: FileReader = new FileReader();
      fileReader.onloadend = (e) => { this.photograph_image = fileReader.result; };
      fileReader.readAsDataURL(this.photograph);
      this.obj.kycDetails.picture = this.photograph.name;
    } else {
      this.photograph_image = '';
    }
  }

  uploadDocumentClicked() {
    this._document.nativeElement.click();
  }

  uploadDocument(files: FileList) {
    this.document = files.item(0);
    if (this.document.type === 'image/jpeg' || this.document.type === 'image/png') {
      const fileReader: FileReader = new FileReader();
      fileReader.onloadend = (e) => { this.photograph_document = fileReader.result; };
      fileReader.readAsDataURL(this.document);
      this.obj.kycDetails.idDocument = this.document.name;
    } else {
      this.photograph_document = '';
    }
  }

}
