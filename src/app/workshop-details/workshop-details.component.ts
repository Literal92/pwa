import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { StarRatingComponent } from 'ng-starrating';
import { Header } from '../shared/header';
import { NotifierService } from 'angular-notifier';
import { EnableLoading, DisableLoading } from '../shared/loading/loading';
import * as $ from 'jquery';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-workshop-details',
  templateUrl: './workshop-details.component.html',
  styleUrls: ['./workshop-details.component.css']
})
export class WorkshopDetailsComponent implements OnInit {
  private readonly notifier: NotifierService;
  workshop$: any;
  id: any;
  myScore: any = 0;
  note: any[] = [];
  datePipe = new DatePipe('en-US');

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private notifierService: NotifierService
  ) {
    this.notifier = notifierService;
  }

  ngOnInit() {
    Header('Workshops Details', false, null);
    EnableLoading();
    document.body.scrollTop = 0;
    let getdata: any[] = [];
    this.id = +this.route.snapshot.params.instroductionalId;
    let Score = localStorage.getItem(`Workshops-${this.id}`);
    if (Score != null) {
      this.myScore = +Score;
    }
    return this.dataService.getInstructionalAll().subscribe((data) => {
      let output = data as any;
      if (output != undefined) {
        getdata.push(...Object.keys(output));
        getdata.forEach(element => {
          let data = output[element];
          data.forEach(element1 => {
            // let index = element1.detail.findIndex(c => c.id == id);
            if (element1.detail.id == this.id) {
              // debugger;
              let start = element1.detail.startDate.date.replace(' ', 'T');
              let end = element1.detail.endDate.date.replace(' ', 'T');
              this.workshop$ = element1.detail;
              this.workshop$['start'] = this.datePipe.transform(start, 'HH:mm');
              this.workshop$['end'] = this.datePipe.transform(end, 'HH:mm');
              this.workshop$['week'] = this.datePipe.transform(start, 'EEEE');
              this.workshop$['day'] = this.datePipe.transform(start, 'dd');
              this.workshop$['month'] = this.datePipe.transform(start, 'LLL');
              Header("Workshops Details", false, this.workshop$.liveFeed, this.workshop$.podcastFeed);
              for (let i = 0; i < this.workshop$.topic.length; i++) {
                let startT = this.workshop$.topic[i].startDate.date.replace(' ', 'T');
                let endT = this.workshop$.topic[i].endDate.date.replace(' ', 'T');
                this.workshop$.topic[i]['startT'] = this.datePipe.transform(startT, 'HH:mm');
                this.workshop$.topic[i]['endT'] = this.datePipe.transform(endT, 'HH:mm');
              }
              DisableLoading();
              return 1;
            }
          });
        });
      }
    }, (err) => {
      DisableLoading();
      this.notifier.show({
        type: 'error',
        message: 'Connection Lost'
      });
    });
    // return this.dataService.getInstructionalDetails(this.id).subscribe(
    //   (data) => {
    //     let output = data as any;
    //     if (output != undefined) {
    //       this.workshop$ = output;
    //       Header('Workshops Details', false, output.liveFeed, output.podcastFeed);
    //       // debugger;
    //       DisableLoading();

    //       console.log(this.workshop$);
    //     } else {
    //       DisableLoading();

    //       this.notifier.show({
    //         type: 'error',
    //         message: 'Not Found'
    //       });
    //     }
    //   },
    //   (err) => {
    //     DisableLoading();
    //     this.notifier.show({
    //       type: 'error',
    //       message: 'Connection Lost'
    //     });
    //   }
    // );
  }

  ratingClick($event: { oldValue: number; newValue: number; starRating: StarRatingComponent }, item: any) {
    let Score = localStorage.getItem(`Workshops-${this.id}`);
    if (Score != null) {
      localStorage.removeItem(`Workshops-${this.id}`);
      localStorage.setItem(`Workshops-${this.id}`, $event.newValue.toString());
    } else {
      localStorage.setItem(`Workshops-${this.id}`, $event.newValue.toString());
    }
    if ($event.oldValue != 0) {
      this.dataService.getRating($event.newValue, $event.oldValue, 'instructionalCourse', item).subscribe(
        (res) => {
          let output = res as any;
          if (output != undefined) {
            console.log(output);
            // this.notifier.show({
            //   type: 'success',
            //   message: 'Rated'
            // });
          } else {
            this.notifier.show({
              type: 'error',
              message: 'Rating Failed'
            });
          }
        },
        (err) => {
          this.notifier.show({
            type: 'error',
            message: err.error.message != undefined ? err.error.message : 'Not Response'
          });
        }
      );
    } else {
      this.dataService.getRating($event.newValue, 'new', 'instructionalCourse', item).subscribe(
        (res) => {
          let output = res as any;
          if (output != undefined) {
            console.log(output);
            // this.notifier.show({
            //   type: 'success',
            //   message: 'Rated'
            // });
          } else {
            this.notifier.show({
              type: 'error',
              message: 'Rating Failed'
            });
          }
        },
        (err) => {
          this.notifier.show({
            type: 'error',
            message: err.error.message != undefined ? err.error.message : 'Not Response'
          });
        }
      );
    }
  }
}
