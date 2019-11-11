import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Welcomes } from './welcome.model';
import { DataService } from '../data.service';
import { Header } from '../shared/header';

@Component ({

  selector : 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls : ['./welcome.component.css']

})
export class welcomeComponent implements OnInit{
  welcome$ : Welcomes[];
  constructor(
    private route: ActivatedRoute,private dataService: DataService
  ) {}

  ngOnInit(){
    Header('Welcome',false,null);
    // return this.dataService.getWelcomeText().subscribe((data) =>{
		// 	this.welcome$ = data;
		// 	console.log(data);
		// });
  }
}
