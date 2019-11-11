import { Component, OnInit } from '@angular/core';
import { Header } from '../shared/header';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { DataService } from '../data.service';
import { EnableLoading, DisableLoading } from '../shared/loading/loading';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  term: any;
  type: any;
  SearchResult: any[] = [];
  private readonly notifier: NotifierService;

  constructor( protected route: ActivatedRoute,
    private dataService: DataService,
    private router: Router,
    private notifierService: NotifierService) {
      this.notifier = notifierService
     }

  ngOnInit() {
    EnableLoading();
    // this.route.params.subscribe(params => {
    //   this.term = params['term'];
    // });
    // debugger;
    this.term = this.route.snapshot.queryParams.term;
    this.type = this.route.snapshot.queryParams.type;
    this.SearchResult = [];
    Header(`Search '${this.term}'`);
    if (this.term != undefined) {
      this.dataService.getSearch(this.term,this.type).subscribe(res =>{
        let output = res as any;
        if (output != undefined && output.length > 0) {
          console.log(output);
          this.SearchResult = output;
          DisableLoading();

        } else {
          DisableLoading();
          this.notifier.show({
            type: 'error',
            message: 'Not Found'
          });
        }
      }, err => {
        DisableLoading();

        this.notifier.show({
          type: 'error',
          message: 'Connection Lost'
        });
      });
    } else {
      DisableLoading();

      this.notifier.show({
        type: 'warning',
        message: 'Not Found'
      });
    }

  }

  onClick(id, type, catId) {
    debugger;
    if (id != undefined && type != undefined) {
      if (type ==="lecture") {
       this.router.navigate([`/lecture/${id}`]);
      }
      if (type ==="instructionalCourse") {
        this.router.navigate([`/workshops/${id}`]);
      }
      if (type ==="abstracts") {
        this.router.navigate([`/articlesDetail/${id}/${catId}`]);
      }
      if (type ==="exhibition") {
        this.router.navigate([`/booths/${id}`]);
      }
    } else {
      this.notifier.show ({
        type: 'error',
        message: 'No Route Found'
      });
    }
  }
}
