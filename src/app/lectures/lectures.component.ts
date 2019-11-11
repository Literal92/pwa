import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationCancel, Route } from '@angular/router';
import { Lectures } from './lectures.model';
import { DataService } from '../data.service';
import { Header } from '../shared/header';
import { DatePipe } from '@angular/common';
import { NotifierService } from 'angular-notifier';
import { EnableLoading, DisableLoading } from '../shared/loading/loading';


@Component({
	selector: 'app-lecture',
	templateUrl: './lectures.component.html',
	styleUrls: [ './lectures.component.css' ]
})
export class LecturesComponent implements OnInit {
  params: string;
  private readonly notifier: NotifierService;
  weekDate: any[] = [];
  lectures : any[] = [];
  output : any[] = [];
  list: any[] = [];
  getdata: any[] = [];
  detail: any[] = [];
  i = 0;
  datePipe = new DatePipe('en-US');
  child:boolean=false;
  dataChild:any[]=[];
  constructor(public route: Router,
    private dataService: DataService,
    private notifierService: NotifierService) {
      this.notifier = notifierService
  }
	ngOnInit() {
    Header("Lectures",true,null);
    EnableLoading();
    this.weekDate = [];
    this.lectures = [];
    this.list = [];
    this.output = [];
    let innerDate: any;
    console.log(this.params);

    this.dataService.getLecturesAll().subscribe(res => {
      this.output = res as any;
      if (this.output != undefined) {
        this.getdata.push(...Object.keys(this.output));
        console.log(this.output);
        console.log(this.getdata);
        this.i = 0;
        this.getdata.forEach(element => {
          this.weekDate.push(this.datePipe.transform(element, 'EEE'));
        });
        this.output[this.getdata[0]].forEach(element1 => {
          // debugger;
          this.list.push(element1.base);
          this.detail.push(element1.detail);
          let start = element1.base.startDate.date.replace(' ', 'T');
          let end = element1.base.endDate.date.replace(' ', 'T');
          this.list[this.i]['week'] = this.datePipe.transform(this.getdata[0], 'EEE');
          this.list[this.i]['start'] = this.datePipe.transform(start, 'HH:mm');
          this.list[this.i]['end'] = this.datePipe.transform(end, 'HH:mm');
          this.i++;
        });
        console.log(this.weekDate);
        console.log(this.lectures);
        // this.lectures.forEach(item => {
        //   if (item.week == this.weekDate[0]){
        //     this.list.push(item);
        //     // console.log(this.list);
        //   }
        // });
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
        type:'error',
        message:'Connection Lost'
      });
    });

    // return this.dataService.getLectures().subscribe((data) => {
    // debugger;
    //   this.output = data as any;
    //   if (this.output != undefined) {
    //     this.getdata.push(...Object.keys(this.output));
    //     console.log(this.output);
    //     console.log(this.getdata);
    //     this.i = 0;
    //     this.getdata.forEach(element => {
    //       this.weekDate.push(this.datePipe.transform(element, 'EEE'));
    //     });
    //     this.output[this.getdata[0]].forEach(element1 => {
    //       this.list.push(element1);
    //       this.list[this.i]['week'] = this.datePipe.transform(this.getdata[0], 'EEE');
    //       this.i++;
    //     });


    //     console.log(this.weekDate);
    //     console.log(this.lectures);
    //     // this.lectures.forEach(item => {
    //     //   if (item.week == this.weekDate[0]){
    //     //     this.list.push(item);
    //     //     // console.log(this.list);
    //     //   }
    //     // });
    //     DisableLoading();

    //   } else {
    //     DisableLoading();
    //     this.notifier.show({
    //       type: 'error',
    //       message: 'Not Found'
    //     });
    //   }
    // }, err => {
    //   DisableLoading();

    //   this.notifier.show({
    //     type:'error',
    //     message:'Connection Lost'
    //   });
    // });

  }

  ngAfterViewInit() {
  }


  activate(weeks, index){
    EnableLoading();
    document.body.scrollTop = 0;
    this.list = [];
    this.detail = [];
    this.i = 0;
    // debugger;
    // this.lectures.forEach(item => {
    //   if (item.week == weeks){
    //     this.list.push(item);
    //     console.log(this.list);
    //   }
    // });
    this.output[this.getdata[index]].forEach(element1 => {
      this.list.push(element1.base);
      this.detail.push(element1.detail);
      let start = this.list[this.i].startDate.date.replace(' ', 'T');
      let end = this.list[this.i].endDate.date.replace(' ', 'T');
      this.list[this.i]['week'] = weeks;
      this.list[this.i]['start'] = this.datePipe.transform(start, 'HH:mm');
      this.list[this.i]['end'] = this.datePipe.transform(end, 'HH:mm');
      this.i++;
    });
    let links = document.getElementsByClassName("active") as HTMLCollectionOf<HTMLElement>;
    links[0].className = links[0].className.replace("active", "");
    let current = document.getElementsByClassName(`link-${weeks}`) as HTMLCollectionOf<HTMLElement>;
    current[0].className += " active";
    DisableLoading();
  }
  onLec(id: number){
    let index = this.detail.findIndex(c => c.id == id);
    if (index > -1) {
      this.child = true;
      this.dataChild = this.detail[index];
    }
  }
  backToParent($event){
    this.child=false;
  }
}
