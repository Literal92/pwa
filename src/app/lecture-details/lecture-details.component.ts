import { Component, OnInit, Input, Output, EventEmitter, LOCALE_ID } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { DataService } from '../data.service';
import { Welcomes } from '../welcome/welcome.model';
import { StarRatingComponent } from 'ng-starrating';
import { Header } from '../shared/header';
import { NotifierService } from 'angular-notifier';
import { EnableLoading, DisableLoading } from '../shared/loading/loading';
import { PlatformLocation, LocationStrategy, DatePipe } from "@angular/common";

@Component({
  selector: 'app-lecture-details',
  templateUrl: './lecture-details.component.html',
  styleUrls: ['./lecture-details.component.css']
})

export class LectureDetailsComponent implements OnInit {
  @Input('dataChild') dataChild: any;
  Wel$: Welcomes[];
  list: any;
  modarate: any[] = [];
  private readonly notifier: NotifierService;
  id: any;
  datePipe = new DatePipe('en-US');
  myScore: any = 0;
  @Output('parent') parent: EventEmitter<any> = new EventEmitter<any>();

  constructor(private route: ActivatedRoute,
    private dataService: DataService,
    private router: Router,
    private location: PlatformLocation,
    private locationStrategy: LocationStrategy,
    private notifierService: NotifierService) {
    // location.onPopState(() => {
    //   history.go(1);
    // });
    this.notifier = notifierService
  }

  ngOnInit() {
    Header("Lectures Details", false, null);
    // debugger;
    document.body.scrollTop = 0;
    this.id = +this.route.snapshot.params.lectureId;
    this.GetData(this.id);
    let Score = localStorage.getItem(`Lecture-${this.id}`);
    if (Score != null) {
      this.myScore = +Score;
    }
    // this.list = this.dataChild;
  }

  ngAfterViewInit() {
    // this.location.onPopState(() => {
    //   // debugger;
    //   // this.router.navigateByUrl('/lecture');
    //   history.go(1);
    //   // this.location.forward();
    //   this.parent.emit(true);
    // });
  }

  backclicked() {

  }

  GetData(id) {
    let getdata: any[] = [];
    EnableLoading();
    this.dataService.getLecturesAll().subscribe(res => {
      let output = res as any;
      if (output != undefined) {
        getdata.push(...Object.keys(output));
        getdata.forEach(element => {
          let data = output[element];
          data.forEach(element1 => {
            // let index = element1.detail.findIndex(c => c.id == id);
            if (element1.detail.id == id) {
              // debugger;
              let start = element1.detail.startDate.date.replace(' ', 'T');
              let end = element1.detail.endDate.date.replace(' ', 'T');
              this.list = element1.detail;
              this.list['start'] = this.datePipe.transform(start, 'HH:mm');
              this.list['end'] = this.datePipe.transform(end, 'HH:mm');
              this.list['week'] = this.datePipe.transform(start, 'EEEE');
              this.list['day'] = this.datePipe.transform(start, 'dd');
              this.list['month'] = this.datePipe.transform(start, 'LLL');
              Header("Lectures Details", false, this.list.liveFeed, this.list.podcastFeed);
              for (let i = 0; i < this.list.topic.length; i++) {
                let startT = this.list.topic[i].startDate.date.replace(' ', 'T');
                let endT = this.list.topic[i].endDate.date.replace(' ', 'T');
                this.list.topic[i]['startT'] = this.datePipe.transform(startT, 'HH:mm');
                this.list.topic[i]['endT'] = this.datePipe.transform(endT, 'HH:mm');
              }
              return 1;
            }
          });
        });
        // this.list = output;
        console.log(this.list);
        DisableLoading();
      } else {
        DisableLoading();
        this.notifier.show({
          type: 'error',
          message: 'Data Not Found'
        });
      }
    }, err => {
      DisableLoading();
      this.notifier.show({
        type: 'error',
        message: err.error.message != undefined ? err.error.message : 'Not Response'
      });
    });
  }

  ratingClick($event: { oldValue: number, newValue: number, starRating: StarRatingComponent }, item: any) {
    // debugger;
    let Score = localStorage.getItem(`Lecture-${this.id}`);
    if (Score != null) {
      localStorage.removeItem(`Lecture-${this.id}`);
      localStorage.setItem(`Lecture-${this.id}`, $event.newValue.toString());
    } else {
      localStorage.setItem(`Lecture-${this.id}`, $event.newValue.toString());
    }
    if ($event.oldValue != 0) {
      this.dataService.getRating($event.newValue, $event.oldValue, "lecture", item).subscribe(res => {
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
      }, err => {
        this.notifier.show({
          type: 'error',
          message: err.error.message != undefined ? err.error.message : 'Not Response'
        })
      });
    } else {
      this.dataService.getRating($event.newValue, "new", "lecture", item).subscribe(res => {
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
      }, err => {
        this.notifier.show({
          type: 'error',
          message: err.error.message != undefined ? err.error.message : 'Not Response'
        });
      });
    }
  }
}
