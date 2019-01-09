import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  time: string;
  constructor() { }

  ngOnInit() {
    setInterval(() => { this.time = new Date().toLocaleTimeString('en-US'); }, 1000);
  }
}
