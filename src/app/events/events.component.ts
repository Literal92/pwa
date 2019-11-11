import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DataService } from '../data.service';
import { Header } from '../shared/header';
import { NotifierService } from 'angular-notifier';
import { EnableLoading, DisableLoading } from '../shared/loading/loading';

@Component({
selector: 'app-events',
templateUrl: './events.component.html',
styleUrls: [ './events.component.css' ]
})
export class EventsComponent implements OnInit {
events$: any[] = [];
id: any;
private readonly notifier: NotifierService;
constructor(
  private route: ActivatedRoute,
  private router: Router,
  private dataService: DataService,
  private notifierService: NotifierService
) {
  this.notifier = notifierService;
}
sendType(type, id) {
  if (type === 'lecture') {
    console.log('lecture');
    this.router.navigate([ '/lecture/' + id ]);
  } else if (type === 'abstracts') {
    console.log('abstracts');
    this.router.navigate([ '/articlesDetail/' + id ]);

  } else {
    console.log('instructional Courses');
    this.router.navigate([ '/workshops/' + id ]);

  }
}

ngOnInit() {
  EnableLoading();
  Header('Events');
  this.id = +this.route.snapshot.params.eventsId;

  this.events$ = [];
  return this.dataService.getEvents().subscribe(
    (data) => {
      let output = data as any;
      if (output != undefined && output.length > 0) {
        this.events$ = output;
        console.log(this.events$);
        DisableLoading();

      } else {
        DisableLoading();
        this.notifier.show({
          type: 'error',
          message: 'Not Found'
        });
      }
      this.events$ = data;
    },
    (err) => {
      DisableLoading();
      this.notifier.show({
        type: 'error',
        message: 'Connection Lost'
      });
    }
  );
}
}
