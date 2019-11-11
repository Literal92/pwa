import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Articles } from './articles.model';
import { DataService } from '../data.service';
import { Header } from '../shared/header';
import { NotifierService } from 'angular-notifier';
import { EnableLoading, DisableLoading } from '../shared/loading/loading';
import { DatePipe } from '@angular/common';
import { count } from 'rxjs/operators';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  articles: any;
  id: any;
  author: any;
  orals: any[] = [];
  posters: any[] = [];
  datePipe = new DatePipe('en-US');
  fixedTimezone = '2015-06-15T09:03:01';
  private readonly notifier: NotifierService;

  constructor(
      private  route: ActivatedRoute,
      private dataService: DataService,
      private notifierService: NotifierService
  ) {
    this.notifier = notifierService
   }

  ngOnInit() {
    this.articles = [];
    EnableLoading();
    Header("Abstracts List",false,null);
    this.id = +this.route.snapshot.params.abstractCat;
    this.dataService.getabstractsAll().subscribe(res => {
      let output = res as any;
      if (output != undefined ) {
        // debugger;
        output.forEach(element => {
          if (element.items.catId == this.id) {
            if (element.items.list.oral.length > 0) {
              let i = 0;
              element.items.list.oral.forEach(element1 => {
                this.orals.push(element1);
                let start = element1.startDate.date.replace(' ', 'T');
                let end = element1.endDate.date.replace(' ', 'T');
                this.orals[i]['week'] = this.datePipe.transform(start, 'EEE');
                this.orals[i]['start'] = this.datePipe.transform(start, 'HH:mm');
                this.orals[i]['end'] = this.datePipe.transform(end, 'HH:mm');
                i++;

              });

              this.articles = this.orals;
            } else {
              this.orals = [];
              this.notifier.show({
                type: 'error',
                message: 'Orals Not Found'
              });
            }
            if (element.items.list.poster.length > 0) {
              let i = 0;
              element.items.list.poster.forEach(element2 => {
                this.posters.push(element2);
                let start = element2.startDate.date.replace(' ', 'T');
                let end = element2.endDate.date.replace(' ', 'T');
                this.posters[i]['week'] = this.datePipe.transform(start, 'EEE');
                this.posters[i]['start'] = this.datePipe.transform(start, 'HH:mm');
                this.posters[i]['end'] = this.datePipe.transform(end, 'HH:mm');
                i++;
              });
            } else {
              this.posters = [];
              // this.notifier.show({
              //   type: 'error',
              //   message: 'Posters Not Found'
              // });
            }
            return 1;
          }
        });
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
      })
    });

  }

  activate(type) {
    EnableLoading();
    // debugger;
    document.body.scrollTop = 0;
    this.articles = [];
    if (type === "Poster" && this.posters != []) {
      this.articles = this.posters;
    }
    if (type === "Oral" && this.orals != []) {
      this.articles = this.orals;
    }
    console.log(this.articles);
    // debugger;
    let links = document.getElementsByClassName('item-' + type) as HTMLCollectionOf<HTMLElement>;
    let current = document.getElementsByClassName("active") as HTMLCollectionOf<HTMLElement>;
    current[0].className = current[0].className.replace("active", "");
    links[0].className += " active";
    DisableLoading();
  }
}
