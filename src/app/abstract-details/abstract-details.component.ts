import { Component, OnInit, Renderer2 } from '@angular/core';
import { StarRatingComponent } from 'ng-starrating';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { NotifierService } from 'angular-notifier';
import { Header } from '../shared/header';
import { EnableLoading, DisableLoading } from '../shared/loading/loading';
import { DatePipe } from '@angular/common';

@Component({
selector: 'app-abstract-details',
templateUrl: './abstract-details.component.html',
styleUrls: [ './abstract-details.component.css' ]
})
export class AbstractDetailsComponent implements OnInit {
private readonly notifier: NotifierService;
id: any;
abstract: any;
authors: any[] = [];
myScore: any = 0;
datePipe = new DatePipe('en-US');
myList = document.getElementsByClassName('authors_list') as HTMLCollectionOf<HTMLElement>;
showLess = document.getElementsByClassName('less') as HTMLCollectionOf<HTMLElement>;
showMore = document.getElementsByClassName('more') as HTMLCollectionOf<HTMLElement>;
catId: any;
moreText = document.getElementsByClassName('moretext_btn') as HTMLCollectionOf<HTMLElement>;
lessText = document.getElementsByClassName('lesstext_btn') as HTMLCollectionOf<HTMLElement>;
abstractText = document.getElementsByClassName('abstract_text') as HTMLCollectionOf<HTMLElement>;

constructor(
  private route: ActivatedRoute,
  private dataService: DataService,
  private renderer: Renderer2,
  private notifierService: NotifierService
) {
  this.notifier = notifierService;
}
showMoree() {
  this.myList[0].className = this.myList[0].className.replace(' show_more_list', '');
  this.showMore[0].style.display = 'none';
  this.showLess[0].style.display = 'block';
}
showLesss() {
  this.myList[0].className += ' show_more_list';
  this.showMore[0].style.display = 'block';
  this.showLess[0].style.display = 'none';
}
ShowMoreText() {
  for (let i = 0; i < this.abstractText[0].childNodes.length; i++) {
    if (i != 0) {
      const element = this.abstractText[0].childNodes[i];
      if (element.nodeType != 3) {
        this.renderer.setStyle(element, 'display', 'block');
        this.lessText[0].style.display = 'block';
        this.moreText[0].style.display = 'none';
      }
    }
  }
}
ShowLessText() {
  // debugger;
  for (let i = 0; i < this.abstractText[0].childNodes.length; i++) {
    if (i != 0) {
      const element = this.abstractText[0].childNodes[i];
      if (element.nodeType != 3) {
        this.renderer.setStyle(element, 'display', 'none');
        this.lessText[0].style.display = 'none';
        this.moreText[0].style.display = 'block';
      }
    }
  }
  // let p = this.abstractText[0].childNodes[0];
  // this.renderer.setStyle(p, 'display', 'none');
}

ngOnInit() {
  Header('Abstract Details', false, null);
  document.body.scrollTop = 0;
  EnableLoading();
  this.id = +this.route.snapshot.params.abstractId;
  this.catId = +this.route.snapshot.params.catId;
  this.abstract = [];
  this.authors = [];
  this.abstractText[0].textContent.slice(0, 50);
  let Score = localStorage.getItem(`Abstract-${this.id}-${this.catId}`);
  if (Score != null) {
    this.myScore = +Score;
  }
  this.dataService.getabstractsAll().subscribe(
  (res) => {
    const output = res as any;
    if (output != undefined) {
      // debugger;
      output.forEach(element => {
        if (element.items.catId == this.catId) {
          element.items.list.oral.forEach(element1 => {
            if (element1.id == this.id) {
              this.abstract = element1;
            }
            return 1;
          });
          element.items.list.poster.forEach(element2 => {
            if (element2.id == this.id) {
              this.abstract = element2;
            }
            return 1;
          });
        }
      });
      // debugger;
      let start = this.abstract.startDate.date.replace(' ','T');
      let end = this.abstract.endDate.date.replace(' ','T');
      this.abstract['week'] = this.datePipe.transform(start, 'EEEE');
      this.abstract['day'] = this.datePipe.transform(start, 'dd');
      this.abstract['month'] = this.datePipe.transform(start, 'LLL');
      this.abstract['start'] = this.datePipe.transform(start, 'HH:mm');
      this.abstract['end'] = this.datePipe.transform(end, 'HH:mm');

      // if (this.abstract.podcastFeed != null) {

      // }
      // debugger;
      // this.authors.push(output.author);
      // console.log(this.authors);
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

ngAfterViewInit(): void {
  for (let i = 0; i < this.abstractText[0].childNodes.length; i++) {
    if (i != 0) {
      const element = this.abstractText[0].childNodes[i];
      if (element.nodeType != 3) {
        this.renderer.setStyle(element, 'display', 'none');
      }
    }
  }
}

ratingClick($event: { oldValue: number; newValue: number; starRating: StarRatingComponent }, item: any) {
    // debugger;
    let Score = localStorage.getItem(`Abstract-${this.id}-${this.catId}`);
    if (Score != null) {
      localStorage.removeItem(`Abstract-${this.id}-${this.catId}`);
      localStorage.setItem(`Abstract-${this.id}-${this.catId}`, $event.newValue.toString());
    } else {
      localStorage.setItem(`Abstract-${this.id}-${this.catId}`, $event.newValue.toString());
    }
    if ($event.oldValue != 0) {
    this.dataService.getRating($event.newValue, $event.oldValue, 'abstract', item).subscribe(
      (res) => {
        const output = res as any;
        if (output != undefined) {
          console.log(output);
          // this.notifier.show({
          // 	type: 'success',
          // 	message: 'Rated'
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
  this.dataService.getRating($event.newValue, 'new', 'abstract', item).subscribe(
      (res) => {
        const output = res as any;
        if (output != undefined) {
          console.log(output);
          // this.notifier.show({
          // 	type: 'success',
          // 	message: 'Rated'
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
