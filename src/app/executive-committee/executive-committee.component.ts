import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { Header } from '../shared/header';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-executive-committee',
  templateUrl: './executive-committee.component.html',
  styleUrls: ['./executive-committee.component.css']
})
export class ExecutiveCommitteeComponent implements OnInit {
  executive$ : any[] = [];
  photoUrl: string;
  photo: string;
  private readonly notifier: NotifierService;
  constructor(
      private route: ActivatedRoute,
      private dataService: DataService,
      private notifierService: NotifierService
  ) {
    this.notifier = notifierService
  }

  ngOnInit() {
    Header('Executive Committee');
    // debugger;
    this.executive$ = [];
    return this.dataService.getExecutive().subscribe((data) =>{
      let output = data as any;
      if (output != undefined) {
        this.executive$ = output.list;
        this.photo = output.basePictureUrl;
        // this.photo = output.basePictureUrl + output.list[0].picture;
        console.log(data);
      }else{
        this.notifier.show({
          type:'error',
          message:'Not Found'
        });
      }

		}, err => {
      this.notifier.show({
        type: 'error',
        message: err.error.message != undefined ? err.error.message : 'Not Response'
      })
    });
  }

}
