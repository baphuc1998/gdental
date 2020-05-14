import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-base-site',
  templateUrl: './base-site.component.html',
  styleUrls: ['./base-site.component.css']
})
export class BaseSiteComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  // TODO: Cross browsing
  gotoTop() {
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }

}
