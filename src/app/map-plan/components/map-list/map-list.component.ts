import { Component, OnInit } from '@angular/core';
import { headersToString } from 'selenium-webdriver/http';
import { Header } from 'src/app/shared/header';

@Component({
  selector: 'app-map-list',
  templateUrl: './map-list.component.html',
  styleUrls: ['./map-list.component.css']
})
export class MapListComponent implements OnInit {

  list: any[] = [
    { id: 1 , title: 'First Floor -Exhibition'},
    { id: 2 , title: 'Grand Floor -Exhibition'},
  ];
  constructor() { }

  ngOnInit() {
    Header("Venue Map",true,null);
  }

}
