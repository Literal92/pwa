import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { StarRatingComponent } from 'ng-starrating';
import { Header } from '../shared/header';
import { NotifierService } from 'angular-notifier';
import { Booth } from '../booths/booth.model';
import { EnableLoading, DisableLoading } from '../shared/loading/loading';

@Component({
selector: 'app-booth-details',
templateUrl: './booth-details.component.html',
styleUrls: [ './booth-details.component.css' ]
})
export class BoothDetailsComponent implements OnInit {
private readonly notifier: NotifierService;
id: any;
booth$: any;
myScore: any = 0;

constructor(
  private route: ActivatedRoute,
  private dataService: DataService,
  private notifierService: NotifierService
) {
  this.notifier = notifierService;
}

ngOnInit() {
  EnableLoading();
  document.body.scrollTop = 0;
  Header('Exhibition Details');
  this.id = +this.route.snapshot.params.boothsId;
  let Score = localStorage.getItem(`Exhibition-${this.id}`);
  if (Score != null) {
    this.myScore = +Score;
  }
  this.booth$ = [];
  return this.dataService.getexhibitionsAll().subscribe(
    (res) => {
      let output = res as any;
      if (output != undefined) {
        // debugger;
        output.forEach(element => {
          if (element.id == this.id) {
            this.booth$ = element;
          }
        });
        console.log(this.booth$);
        DisableLoading();

      } else {
        DisableLoading();
        this.notifier.show({
          type: 'error',
          message: 'Data Not Found'
        });
      }
    },
    (err) => {
      DisableLoading();
      this.notifier.show({
        type: 'error',
        message: err.error.message != undefined ? err.error.message : 'Not Response'
      });
    }
  );
}

ratingClick($event: { oldValue: number; newValue: number; starRating: StarRatingComponent }, item: any) {
  // debugger;
  let Score = localStorage.getItem(`Exhibition-${this.id}`);
  if (Score != null) {
    localStorage.removeItem(`Exhibition-${this.id}`);
    localStorage.setItem(`Exhibition-${this.id}`, $event.newValue.toString());
  } else {
    localStorage.setItem(`Exhibition-${this.id}`, $event.newValue.toString());
  }
  if ($event.oldValue != 0) {
    this.dataService.getRating($event.newValue, $event.oldValue, 'exhibition', item).subscribe(
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
    this.dataService.getRating($event.newValue, 'new', 'exhibition', item).subscribe(
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
