import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { Header } from '../shared/header';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-about-details',
  templateUrl: './about-details.component.html',
  styleUrls: ['./about-details.component.css']
})
export class AboutDetailsComponent implements OnInit {
  about: any;
  id : any;
  photoUrl: string;
  photo: string;
  private readonly notifier: NotifierService;

  constructor(private route: ActivatedRoute, private dataService: DataService,private notifierService: NotifierService
    ) {
      this.notifier = notifierService;
     }

  ngOnInit() {
    this.about = [];
    this.photoUrl = "https://panel.irsocapp.com";
    Header("About Details",false,null);
    this.id = +this.route.snapshot.params.about$;
    this.dataService.getAboutMashhad().subscribe((data) => {
      let output = data as any;
      if(output != undefined && output.length > 0){
        output.forEach(element => {
          // debugger;
          let id =  element.id;
          if (id == this.id) {
            this.about = element;
            this.photo = this.photoUrl + element.picture;
          }
        });
        console.log(this.about);
      }else{
        this.notifier.show({
          type: 'error',
          message: 'Not Found'
        });
      }
		},err => {
      this.notifier.show({
        type: 'error',
        message: 'Connection Lost'
      });
    });
  }

}
