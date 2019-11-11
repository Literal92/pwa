import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { Header } from '../shared/header';
import { NotifierService } from 'angular-notifier';


@Component({
  selector: 'app-scientific-committee',
  templateUrl: './scientific-committee.component.html',
  styleUrls: ['./scientific-committee.component.css']
})

export class ScientificCommitteeComponent implements OnInit {
  Scientific$ : any[] = [];
  photoUrl: string;
  photo: string;
  private readonly notifier: NotifierService;

  constructor(
      private route: ActivatedRoute,
      private dataService: DataService,
      private notifierService: NotifierService

  ) {this.notifier = notifierService}

  ngOnInit() {
    Header('Scientific Committee');
    this.Scientific$ = [];
    // debugger;
    return this.dataService.getScientifics().subscribe((data) => {
      let output = data as any;
      if (output != undefined) {
        this.Scientific$ = output.list;
        this.photo = output.basePictureUrl;
        console.log(this.Scientific$);
      }else{
        this.notifier.show({
          type:'error',
          message:'Not Found'
        });
      }

		},err =>{
      this.notifier.show({
        type: 'error',
        message: err.error.message != undefined ? err.error.message : 'Not Response'
      })
    });
  }

}
