import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { Header } from '../shared/header';
import { NotifierService } from 'angular-notifier';
import { DatePipe } from '@angular/common';
import { EnableLoading, DisableLoading } from '../shared/loading/loading';

@Component({
  selector: 'app-workshops',
  templateUrl: './workshops.component.html',
  styleUrls: ['./workshops.component.css']
})
export class WorkshopsComponent implements OnInit {
  private readonly notifier: NotifierService;
  instroductional$: any[] = [];
  // weekDate: any;
  weekDate: any[] = [];
  list: any[] = [];
  getdata: any[] = [];
  output: any;
  datePipe = new DatePipe('en-US');
  // activate(){
	// 	let links = document.getElementsByTagName("a") as HTMLCollectionOf<HTMLElement>;
	// 	for (var i=0; i < links.length; i++){
	// 		links[i].addEventListener("click", function(){
	// 			let current = document.getElementsByClassName("active") as HTMLCollectionOf<HTMLElement>;
	// 			current[0].className = current[0].className.replace("active", "");
	// 			this.className += "active";
	// 		});
	// 	}
	// }

  constructor(
      private route: ActivatedRoute,
      private dataService: DataService,
      private notifierService: NotifierService) {
        this.notifier = notifierService;
      }

  ngOnInit() {
    this.weekDate = [];
    this.instroductional$ = []; this.list = [];
    EnableLoading();
    Header('Workshops',true,null);
    this.dataService.getInstructionalAll().subscribe((data) => {
      this.output = data as any;
      if (this.output != undefined ) {
        // debugger;
        this.getdata.push(...Object.keys(this.output));
        let i = 0;
        this.getdata.forEach(element => {
          this.weekDate.push(this.datePipe.transform(element, 'EEE'));
          // output[element].forEach(element1 => {
          //   this.instroductional$.push(element1.base);
          //   this.instroductional$[i]['week'] = datePipe.transform(element, 'EEE');
          //   i++;
          // });
        });
        this.output[this.getdata[0]].forEach(element => {
          this.instroductional$.push(element.base);
          let start = element.base.startDate.date.replace(' ','T');
          let end = element.base.endDate.date.replace(' ','T');
          this.instroductional$[i]['week'] = this.datePipe.transform(this.getdata[0], 'EEE');
          this.instroductional$[i]['start'] = this.datePipe.transform(start, 'HH:mm');
          this.instroductional$[i]['end'] = this.datePipe.transform(end, 'HH:mm');
          i++;
        });
        console.log(this.instroductional$);
        DisableLoading();

      } else {
        DisableLoading();
        this.notifier.show({
          type:'error',
          message:'Not Found'
        });
      }
    }, err => {
      DisableLoading();
      this.notifier.show({
        type:'error',
        message:'Connection Lost'
      });
    });
    // this.dataService.getInstructional().subscribe((data) => {
    //   let output = data as any;
    //   if (output != undefined ) {
    //     console.log(this.weekDate);
    //     getdata.push(...Object.keys(output));
    //     let i = 0;
    //     getdata.forEach(element => {
    //       this.weekDate.push(datePipe.transform(element, 'EEE'));
    //       output[element].forEach(element1 => {
    //         this.instroductional$.push(element1);
    //         this.instroductional$[i]['week'] = datePipe.transform(element, 'EEE');
    //         i++;
    //       });
    //     });
    //     this.instroductional$.forEach(item => {
    //       if (item.week == this.weekDate[0]){
    //         this.list.push(item);
    //         console.log(this.list);
    //       }
    //     });
    //     DisableLoading();
    //   } else {
    //     DisableLoading();
    //     this.notifier.show({
    //       type:'error',
    //       message:'Not Found'
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

  activate(weeks, index){
    EnableLoading();
    document.body.scrollTop = 0;
    // debugger;
    this.list = [];
    let i = 0;
    this.instroductional$ = [];
    this.output[this.getdata[index]].forEach(element => {
      this.instroductional$.push(element.base);
      let start = element.base.startDate.date.replace(' ','T');
      let end = element.base.endDate.date.replace(' ','T');
      this.instroductional$[i]['week'] = this.datePipe.transform(this.getdata[index], 'EEE');
      this.instroductional$[i]['start'] = this.datePipe.transform(start, 'HH:mm');
      this.instroductional$[i]['end'] = this.datePipe.transform(end, 'HH:mm');
      i++;
    });
    // this.instroductional$.forEach(item => {
    //   if (item.week == weeks){
    //     this.list.push(item);
    //     console.log(this.list);
    //   }
    // });
    let links = document.getElementsByClassName("active") as HTMLCollectionOf<HTMLElement>;
    links[0].className = links[0].className.replace("active", "");
    let current = document.getElementsByClassName(`link-${weeks}`) as HTMLCollectionOf<HTMLElement>;
    current[0].className += " active";
    DisableLoading();
  }

}
